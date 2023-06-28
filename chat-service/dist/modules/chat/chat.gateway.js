"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const schedule_1 = require("@nestjs/schedule");
const extended_logger_1 = require("../../common/extended-logger");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
const websockets_1 = require("@nestjs/websockets");
const user_authenticated_guard_1 = require("../../common/guards/user-authenticated.guard");
const users_service_1 = require("../users/users.service");
const ws_chat_join_dto_1 = require("./dto/ws-chat-join.dto");
const ws_chat_joined_dto_1 = require("./dto/ws-chat-joined.dto");
const ws_chat_message_dto_1 = require("./dto/ws-chat-message.dto");
const ws_chat_message_send_dto_1 = require("./dto/ws-chat-message-send.dto");
const ws_chat_status_dto_1 = require("./dto/ws-chat-status.dto");
const ws_chat_user_muted_dto_1 = require("./dto/ws-chat-user-muted.dto");
const ws_chat_user_mute_dto_1 = require("./dto/ws-chat-user-mute.dto");
const ws_exception_filter_1 = require("../../common/exception-filter/ws-exception.filter");
const ws_rpc_response_dto_1 = require("../../common/dtos/ws-rpc-response.dto");
let ChatGateway = class ChatGateway {
    constructor(usersService, chatService) {
        this.usersService = usersService;
        this.chatService = chatService;
        this.logger = new extended_logger_1.ExtendedLogger("chat-gateway");
        this.connectedSockets = new Set();
    }
    notifyStatus() {
        try {
            const message = this.chatService.getLastMessage();
            this.server.emit("CHAT_STATUS", ws_chat_status_dto_1.WsChatStatusDto.fromInformation(this.connectedSockets.size, message === null || message === void 0 ? void 0 : message.created));
        }
        catch (error) {
            this.logger.errorEx({
                message: "Failed to update chat status of all users",
                exception: error,
            });
        }
    }
    sendSystemMessage() {
        try {
            const lastMessage = this.chatService.getLastMessage();
            if (!(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.user)) {
                return;
            }
            const message = this.chatService.createMessage(null, "This is a system message!! Welcome to our humble chat service.");
            this.server.emit("CHAT_MESSAGE", ws_chat_message_dto_1.WsChatMessageDto.fromMessage(message));
        }
        catch (error) {
            this.logger.errorEx({
                message: "Failed to send a sample system chat message",
                exception: error,
            });
        }
    }
    onJoined(socket, dto) {
        const messages = this.chatService.getLastMessages();
        if (!!socket.user) {
            socket.join(`USER_${socket.user.userId}`);
            const mutedUsers = this.chatService.getUserMutedUsers(socket.user);
            socket.emit("CHAT_JOIN_RESULT", new ws_rpc_response_dto_1.WsRPCResponseDto(dto, ws_chat_joined_dto_1.WsChatJoinedDto.fromMessagesAndMutedUsers(this.connectedSockets.size, messages, mutedUsers)));
        }
        else {
            socket.emit("CHAT_JOIN_RESULT", new ws_rpc_response_dto_1.WsRPCResponseDto(dto, ws_chat_joined_dto_1.WsChatJoinedDto.fromMessagesAndMutedUsers(this.connectedSockets.size, messages)));
        }
    }
    onSendMessage(socket, dto) {
        var _a;
        if (!socket.user) {
            throw new common_1.UnauthorizedException();
        }
        const message = this.chatService.createMessage(socket.user, dto.message, (_a = dto.reply_to) !== null && _a !== void 0 ? _a : undefined);
        const response = ws_chat_message_dto_1.WsChatMessageDto.fromMessage(message);
        this.server.emit("CHAT_MESSAGE", response);
        socket.emit("CHAT_SEND_MESSAGE_RESULT", new ws_rpc_response_dto_1.WsRPCResponseDto(dto, response));
    }
    onMuteUser(socket, dto) {
        if (!socket.user) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const otherUser = this.usersService.getUser(dto.user_id);
            if (!otherUser || otherUser.userId === socket.user.userId) {
                throw new common_1.BadRequestException();
            }
            let isSuccess = false;
            if (dto.mute) {
                isSuccess = this.chatService.muteUser(socket.user, otherUser) != null;
            }
            else {
                isSuccess = this.chatService.unmuteUser(socket.user, otherUser);
            }
            socket.emit("CHAT_MUTE_RESULT", new ws_rpc_response_dto_1.WsRPCResponseDto(dto, isSuccess));
        }
        finally {
            const mutedUsers = this.chatService.getUserMutedUsers(socket.user);
            this.server
                .to(`USER_${socket.user.userId}`)
                .emit("CHAT_MUTED_USERS", ws_chat_user_muted_dto_1.WsChatUserMutedDto.fromMutedUsers(mutedUsers));
        }
    }
    handleConnection(socket, ..._args) {
        const handler = () => {
            socket.removeListener("disconnecting", handler);
            socket.leaveAll();
            this.connectedSockets.delete(socket.id);
        };
        socket.on("disconnecting", handler);
        this.connectedSockets.add(socket.id);
    }
    handleDisconnect(_socket) {
    }
    afterInit(_server) {
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "notifyStatus", null);
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "sendSystemMessage", null);
__decorate([
    websockets_1.SubscribeMessage("CHAT_JOIN"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ws_chat_join_dto_1.WsChatJoinDto]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "onJoined", null);
__decorate([
    websockets_1.SubscribeMessage("CHAT_SEND_MESSAGE"),
    common_1.UseGuards(user_authenticated_guard_1.UserAuthenticatedGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ws_chat_message_send_dto_1.WsChatMessageSendDto]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "onSendMessage", null);
__decorate([
    websockets_1.SubscribeMessage("CHAT_MUTE"),
    common_1.UseGuards(user_authenticated_guard_1.UserAuthenticatedGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ws_chat_user_mute_dto_1.WsChatUserMuteDto]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "onMuteUser", null);
ChatGateway = __decorate([
    websockets_1.WebSocketGateway({ path: "/ws" }),
    common_1.UseFilters(new ws_exception_filter_1.WsExceptionsFilter(new extended_logger_1.ExtendedLogger("chat-gateway"))),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        chat_service_1.ChatService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map
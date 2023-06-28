import {
    BadRequestException, UnauthorizedException, UseFilters, UseGuards, UsePipes, ValidationPipe
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ExtendedLogger } from "../../common/extended-logger";
import { JwtGuard } from "../../common/guards/jwt.guard";
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { SocketClient } from "../../common/interfaces/socket-client.interface";
import { UserAuthenticatedGuard } from "../../common/guards/user-authenticated.guard";
import { UserModel } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
import { WsChatJoinDto } from "./dto/ws-chat-join.dto";
import { WsChatJoinedDto } from "./dto/ws-chat-joined.dto";
import { WsChatMessageDto } from "./dto/ws-chat-message.dto";
import { WsChatMessageSendDto } from "./dto/ws-chat-message-send.dto";
import { WsChatStatusDto } from "./dto/ws-chat-status.dto";
import { WsChatUserMutedDto } from "./dto/ws-chat-user-muted.dto";
import { WsChatUserMuteDto } from "./dto/ws-chat-user-mute.dto";
import { WsExceptionsFilter } from "../../common/exception-filter/ws-exception.filter";
import { WsRPCResponseDto } from "../../common/dtos/ws-rpc-response.dto";

@WebSocketGateway({ path: "/ws" })
@UseFilters(new WsExceptionsFilter(new ExtendedLogger("chat-gateway")))
@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtGuard) // this combination of guards allow anonymous users to connect
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    private server!: Server;
    private readonly logger = new ExtendedLogger("chat-gateway");
    private connectedSockets = new Set<string>();
    private lastSystemMessage: number | undefined;

    public constructor(
        private readonly usersService: UsersService,
        private readonly chatService: ChatService
    ) { }

    @Cron(CronExpression.EVERY_MINUTE)
    public notifyStatus(): void {
        try {
            const message = this.chatService.getLastMessage();
            this.server.emit(
                "CHAT_STATUS",
                WsChatStatusDto.fromInformation(this.connectedSockets.size, message?.created)
            );
        } catch (error) {
            this.logger.errorEx(
                {
                    message: "Failed to update chat status of all users",
                    exception: error,
                }
            );
        }
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    public sendSystemMessage(): void {
        try {
            const lastMessage = this.chatService.getLastMessage();
            if (!lastMessage?.user) {
                return;
            }

            const message = this.chatService.createMessage(
                null,
                "This is a system message!! Welcome to our humble chat service."
            );

            this.server.emit("CHAT_MESSAGE", WsChatMessageDto.fromMessage(message));
        } catch (error) {
            this.logger.errorEx(
                {
                    message: "Failed to send a sample system chat message",
                    exception: error,
                }
            );
        }
    }

    @SubscribeMessage("CHAT_JOIN")
    public onJoined(socket: SocketClient<UserModel>, dto: WsChatJoinDto): void {
        const messages = this.chatService.getLastMessages();

        if (!!socket.user) {
            socket.join(`USER_${socket.user.userId}`);

            const mutedUsers = this.chatService.getUserMutedUsers(socket.user);
            socket.emit(
                "CHAT_JOIN_RESULT",
                new WsRPCResponseDto(
                    dto,
                    WsChatJoinedDto.fromMessagesAndMutedUsers(
                        this.connectedSockets.size,
                        messages,
                        mutedUsers
                    )
                )
            );
        } else {
            socket.emit(
                "CHAT_JOIN_RESULT",
                new WsRPCResponseDto(
                    dto,
                    WsChatJoinedDto.fromMessagesAndMutedUsers(
                        this.connectedSockets.size,
                        messages
                    )
                )
            );
        }
    }

    @SubscribeMessage("CHAT_SEND_MESSAGE")
    @UseGuards(UserAuthenticatedGuard)
    public onSendMessage(socket: SocketClient<UserModel>, dto: WsChatMessageSendDto): void {
        if (!socket.user) {
            throw new UnauthorizedException();
        }

        const message = this.chatService.createMessage(
            socket.user,
            dto.message,
            dto.reply_to ?? undefined
        );

        const response = WsChatMessageDto.fromMessage(message);

        // notify all
        this.server.emit("CHAT_MESSAGE", response);

        // notify user
        socket.emit(
            "CHAT_SEND_MESSAGE_RESULT",
            new WsRPCResponseDto(dto, response)
        );
    }

    @SubscribeMessage("CHAT_MUTE")
    @UseGuards(UserAuthenticatedGuard)
    public onMuteUser(socket: SocketClient<UserModel>, dto: WsChatUserMuteDto): void {
        if (!socket.user) {
            throw new UnauthorizedException();
        }

        try {
            const otherUser = this.usersService.getUser(dto.user_id);
            if (!otherUser || otherUser.userId === socket.user.userId) {
                throw new BadRequestException();
            }

            let isSuccess = false;
            if (dto.mute) {
                isSuccess = this.chatService.muteUser(socket.user, otherUser) != null;
            } else {
                isSuccess = this.chatService.unmuteUser(socket.user, otherUser);
            }

            socket.emit(
                "CHAT_MUTE_RESULT",
                new WsRPCResponseDto(dto, isSuccess)
            );
        } finally {
            const mutedUsers = this.chatService.getUserMutedUsers(socket.user);
            this.server
                .to(`USER_${socket.user.userId}`)
                .emit(
                    "CHAT_MUTED_USERS",
                    WsChatUserMutedDto.fromMutedUsers(mutedUsers)
                );
        }
    }

    public handleConnection(socket: SocketClient<UserModel>, ..._args: unknown[]): void {
        // add disconnecting event
        const handler = () => {
            socket.removeListener("disconnecting", handler);

            socket.leaveAll();

            this.connectedSockets.delete(socket.id);
        };
        socket.on("disconnecting", handler);

        this.connectedSockets.add(socket.id);
        
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public handleDisconnect(_socket: SocketClient): void {
        // ignore
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public afterInit(_server: Server): void {
        // ignore
    }
}

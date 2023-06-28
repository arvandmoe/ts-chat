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
exports.ChatService = void 0;
const cached_list_1 = require("../../common/utilities/cached-list");
const circular_list_1 = require("../../common/utilities/circular-list");
const environment_1 = require("../environment/environment");
const extended_logger_1 = require("../../common/extended-logger");
const common_1 = require("@nestjs/common");
let ChatService = class ChatService {
    constructor(environment) {
        this.environment = environment;
        this.logger = new extended_logger_1.ExtendedLogger("chat-service");
        this.lastMessageByUserCache = new cached_list_1.CachedList(60 * 1000);
        this.lastMessageId = 0;
        this.messageRepository = new Map();
        this.mutedUsersRepository = new Map();
        this.lastMessages = new circular_list_1.CircularList(environment.config.chat.history);
    }
    getLastMessages() {
        return this.lastMessages.getEntries();
    }
    getLastMessage() {
        return this.lastMessage;
    }
    createMessage(sender, body, replyTo) {
        var _a;
        try {
            const acceptableDelayBetweenMessages = (60 * 1000) / this.environment.config.chat.maxMessagePerMinute;
            if (!!sender) {
                const lastMessage = this.lastMessageByUserCache.get(sender.userId);
                if (lastMessage &&
                    (Date.now() - lastMessage.created.getTime()) < acceptableDelayBetweenMessages) {
                    throw new Error("Spamming is not allowed");
                }
                if ((lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.message.toLowerCase().trim()) === body.toLowerCase().trim()) {
                    throw new Error("Sending duplicate messages is not allowed");
                }
            }
            let replyToMessage;
            if (!!replyTo) {
                replyToMessage = this.messageRepository.get(replyTo);
                if (!replyToMessage) {
                    throw new Error("Invalid message is used to reply to");
                }
            }
            const message = {
                id: (++this.lastMessageId),
                message: body,
                user: sender,
                replyTo: replyToMessage !== null && replyToMessage !== void 0 ? replyToMessage : null,
                created: new Date(),
            };
            this.messageRepository.set(message.id, message);
            this.lastMessages.enqueue(message);
            this.lastMessage = message;
            if (sender != null) {
                this.lastMessageByUserCache.set(sender.userId, message);
            }
            return message;
        }
        catch (error) {
            this.logger.errorEx({
                message: "Failed to create a new message",
                exception: error,
                meta: { senderUserId: (_a = sender === null || sender === void 0 ? void 0 : sender.userId) !== null && _a !== void 0 ? _a : "[SYSTEM]" },
            });
            throw error;
        }
    }
    getUserMutedUsers(user) {
        var _a, _b;
        try {
            return [...((_b = (_a = this.mutedUsersRepository.get(user.userId)) === null || _a === void 0 ? void 0 : _a.values()) !== null && _b !== void 0 ? _b : [])];
        }
        catch (error) {
            this.logger.errorEx({
                message: "Failed to get the list of muted users for a chat user",
                exception: error,
                meta: { userId: user.userId },
            });
            throw error;
        }
    }
    muteUser(user, targetUser) {
        try {
            let mutedList = this.mutedUsersRepository.get(user.userId);
            if (!mutedList) {
                mutedList = new Map();
                this.mutedUsersRepository.set(user.userId, mutedList);
            }
            let mutedUser = mutedList.get(targetUser.userId);
            if (!mutedUser) {
                mutedUser = {
                    userId: user.userId,
                    mutedUser: targetUser,
                    created: new Date(),
                };
                mutedList.set(targetUser.userId, mutedUser);
            }
            return mutedUser;
        }
        catch (error) {
            this.logger.errorEx({
                message: "Failed to mute user",
                exception: error,
                meta: { userId: user.userId, targetUserId: targetUser.userId },
            });
            throw error;
        }
    }
    unmuteUser(user, targetUser) {
        try {
            const mutedList = this.mutedUsersRepository.get(user.userId);
            if (!mutedList) {
                return false;
            }
            return mutedList.delete(targetUser.userId);
        }
        catch (error) {
            this.logger.errorEx({
                message: "Failed to unmute user",
                exception: error,
                meta: { userId: user.userId, targetUserId: targetUser.userId },
            });
            throw error;
        }
    }
};
ChatService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [environment_1.Environment])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map
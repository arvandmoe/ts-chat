import { CachedList } from "../../common/utilities/cached-list";
import { ChatMessageModel } from "./models/chat-message.model";
import { CircularList } from "../../common/utilities/circular-list";
import { Environment } from "../environment/environment";
import { ExtendedLogger } from "../../common/extended-logger";
import { Injectable } from "@nestjs/common";
import { MutedUserModel } from "./models/muted-user.model";
import { UserModel } from "../users/models/user.model";

@Injectable()
export class ChatService {
    private readonly logger = new ExtendedLogger("chat-service");

    private lastMessage: ChatMessageModel | undefined;
    private readonly lastMessages: CircularList<ChatMessageModel>;
    private readonly lastMessageByUserCache = new CachedList<number, ChatMessageModel>(60 * 1000);

    private lastMessageId = 0;
    private readonly messageRepository = new Map<number, ChatMessageModel>();

    private readonly mutedUsersRepository = new Map<number, Map<number, MutedUserModel>>();

    public constructor(
        private readonly environment: Environment
    ) {
        this.lastMessages = new CircularList(environment.config.chat.history);
    }

    public getLastMessages(): ChatMessageModel[] {
        return this.lastMessages.getEntries();
    }

    public getLastMessage(): ChatMessageModel | undefined {
        return this.lastMessage;
    }

    public createMessage(
        sender: UserModel | null,
        body: string,
        replyTo?: number
    ): ChatMessageModel {
        try {
            const acceptableDelayBetweenMessages = (60 * 1000) / this.environment.config.chat.maxMessagePerMinute;

            if (!!sender) {
                const lastMessage = this.lastMessageByUserCache.get(sender.userId);
                if (
                    lastMessage &&
                    (Date.now() - lastMessage.created.getTime()) < acceptableDelayBetweenMessages
                ) {
                    throw new Error("Spamming is not allowed");
                }

                if (lastMessage?.message.toLowerCase().trim() === body.toLowerCase().trim()) {
                    throw new Error("Sending duplicate messages is not allowed");
                }
            }

            let replyToMessage: ChatMessageModel | undefined;
            if (!!replyTo) {
                replyToMessage = this.messageRepository.get(replyTo);
                if (!replyToMessage) {
                    throw new Error("Invalid message is used to reply to");
                }
            }

            const message: ChatMessageModel = {
                id: (++this.lastMessageId),
                message: body,
                user: sender,
                replyTo: replyToMessage ?? null,
                created: new Date(),
            };

            this.messageRepository.set(message.id, message);
            this.lastMessages.enqueue(message);
            this.lastMessage = message;

            if (sender != null) {
                this.lastMessageByUserCache.set(sender.userId, message);
            }

            return message;
        } catch (error) {
            this.logger.errorEx(
                {
                    message: "Failed to create a new message",
                    exception: error,
                    meta: { senderUserId: sender?.userId ?? "[SYSTEM]" },
                }
            );

            throw error;
        }
    }

    public getUserMutedUsers(user: UserModel): MutedUserModel[] {
        try {
            return [ ...(this.mutedUsersRepository.get(user.userId)?.values() ?? []) ];
        } catch (error) {
            this.logger.errorEx(
                {
                    message: "Failed to get the list of muted users for a chat user",
                    exception: error,
                    meta: { userId: user.userId },
                }
            );
            throw error;
        }
    }

    public muteUser(user: UserModel, targetUser: UserModel): MutedUserModel {
        try {
            let mutedList = this.mutedUsersRepository.get(user.userId);
            if (!mutedList) {
                mutedList = new Map<number, MutedUserModel>();
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
        } catch (error) {
            this.logger.errorEx(
                {
                    message: "Failed to mute user",
                    exception: error,
                    meta: { userId: user.userId, targetUserId: targetUser.userId },
                }
            );
            throw error;
        }
    }

    public unmuteUser(user: UserModel, targetUser: UserModel): boolean {
        try {
            const mutedList = this.mutedUsersRepository.get(user.userId);
            if (!mutedList) {
                return false;
            }

            return mutedList.delete(targetUser.userId);
        } catch (error) {
            this.logger.errorEx(
                {
                    message: "Failed to unmute user",
                    exception: error,
                    meta: { userId: user.userId, targetUserId: targetUser.userId },
                }
            );
            throw error;
        }
    }
}

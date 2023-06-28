import { ChatMessageModel } from "./models/chat-message.model";
import { Environment } from "../environment/environment";
import { MutedUserModel } from "./models/muted-user.model";
import { UserModel } from "../users/models/user.model";
export declare class ChatService {
    private readonly environment;
    private readonly logger;
    private lastMessage;
    private readonly lastMessages;
    private readonly lastMessageByUserCache;
    private lastMessageId;
    private readonly messageRepository;
    private readonly mutedUsersRepository;
    constructor(environment: Environment);
    getLastMessages(): ChatMessageModel[];
    getLastMessage(): ChatMessageModel | undefined;
    createMessage(sender: UserModel | null, body: string, replyTo?: number): ChatMessageModel;
    getUserMutedUsers(user: UserModel): MutedUserModel[];
    muteUser(user: UserModel, targetUser: UserModel): MutedUserModel;
    unmuteUser(user: UserModel, targetUser: UserModel): boolean;
}

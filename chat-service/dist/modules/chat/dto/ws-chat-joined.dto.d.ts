import { ChatMessageModel } from "../models/chat-message.model";
import { MutedUserModel } from "../models/muted-user.model";
import { WsChatMessageDto } from "./ws-chat-message.dto";
import { WsChatStatusDto } from "./ws-chat-status.dto";
import { WsChatUserMutedDto } from "./ws-chat-user-muted.dto";
export declare class WsChatJoinedDto extends WsChatStatusDto {
    messages: WsChatMessageDto[];
    muted_users: WsChatUserMutedDto[];
    static fromMessagesAndMutedUsers(currentMembers: number, messages: ChatMessageModel[], mutedUsers?: MutedUserModel[]): WsChatJoinedDto;
}

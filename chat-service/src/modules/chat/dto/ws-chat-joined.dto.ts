import { ChatMessageModel } from "../models/chat-message.model";
import { Expose, plainToClass, Type } from "class-transformer";
import { MutedUserModel } from "../models/muted-user.model";
import { WsChatMessageDto } from "./ws-chat-message.dto";
import { WsChatStatusDto } from "./ws-chat-status.dto";
import { WsChatUserMutedDto } from "./ws-chat-user-muted.dto";

export class WsChatJoinedDto extends WsChatStatusDto {
    @Expose()
    @Type(() => WsChatMessageDto)
    public messages!: WsChatMessageDto[];

    @Expose()
    @Type(() => WsChatUserMutedDto)
    public muted_users!: WsChatUserMutedDto[];

    public static fromMessagesAndMutedUsers(currentMembers: number, messages: ChatMessageModel[], mutedUsers?: MutedUserModel[]): WsChatJoinedDto {
        return plainToClass<WsChatJoinedDto, Partial<WsChatJoinedDto>>(
            WsChatJoinedDto,
            {
                messages: WsChatMessageDto.fromMessages(messages),
                last_message: !!messages.length ? messages[messages.length - 1].created : null,
                muted_users: mutedUsers ? WsChatUserMutedDto.fromMutedUsers(mutedUsers) : [],
                users: currentMembers,
            }
        );
    }
}

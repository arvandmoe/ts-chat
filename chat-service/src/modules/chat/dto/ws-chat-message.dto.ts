import { ChatMessageModel } from "../models/chat-message.model";
import { Expose, plainToClass, Type } from "class-transformer";
import { WsChatMessageReplyToDto } from "./ws-chat-message-reply-to.dto";

export class WsChatMessageDto extends WsChatMessageReplyToDto {
    @Expose()
    @Type(() => WsChatMessageReplyToDto)
    public reply_to!: WsChatMessageReplyToDto | null;

    public static fromMessage(model: ChatMessageModel): WsChatMessageDto {
        return plainToClass<WsChatMessageDto, Partial<WsChatMessageDto>>(
            WsChatMessageDto,
            {
                ...(WsChatMessageReplyToDto.fromMessage(model)),
                reply_to: !model.replyTo ? null : WsChatMessageReplyToDto.fromMessage(model.replyTo),
                date: model.created,
            }
        );
    }

    public static fromMessages(models: ChatMessageModel[]): WsChatMessageDto[] {
        return models.map((m) => WsChatMessageDto.fromMessage(m));
    }
}

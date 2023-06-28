import { ChatMessageModel } from "../models/chat-message.model";
import { WsChatMessageReplyToDto } from "./ws-chat-message-reply-to.dto";
export declare class WsChatMessageDto extends WsChatMessageReplyToDto {
    reply_to: WsChatMessageReplyToDto | null;
    static fromMessage(model: ChatMessageModel): WsChatMessageDto;
    static fromMessages(models: ChatMessageModel[]): WsChatMessageDto[];
}

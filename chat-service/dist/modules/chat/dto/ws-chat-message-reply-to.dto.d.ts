import { ChatMessageModel } from "../models/chat-message.model";
import { UserDto } from "../../users/dtos/user.dto";
export declare class WsChatMessageReplyToDto {
    id: number;
    message: string;
    user: UserDto | null;
    date: Date;
    static fromMessage(model: ChatMessageModel): WsChatMessageReplyToDto;
}

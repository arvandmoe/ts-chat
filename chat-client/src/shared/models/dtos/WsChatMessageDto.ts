import { UserDto } from "./UserDto";
import { WsChatMessageReplyToDto } from "./WsChatMessageReplyToDto";

interface WsChatMessageDto {
    id: number;
    user: UserDto | null;
    message: string;
    date: string;
    reply_to: WsChatMessageReplyToDto | null;
}

export type { WsChatMessageDto }
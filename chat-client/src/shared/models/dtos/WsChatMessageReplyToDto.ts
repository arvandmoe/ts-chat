import { UserDto } from "./UserDto";

interface WsChatMessageReplyToDto {
    id: number;
    user: UserDto | null;
    message: string;
    date: string;
}

export type { WsChatMessageReplyToDto }
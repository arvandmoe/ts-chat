import { WsChatMessageDto } from "./WsChatMessageDto";
import { WsChatUserMutedDto } from "./WsChatUserMutedDto";

interface WsChatJoinedDto {
    last_message: string | null;
    users: number;
    messages: WsChatMessageDto[];
    muted_users: WsChatUserMutedDto[];

}

export type { WsChatJoinedDto }
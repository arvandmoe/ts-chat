import { UserDto } from "./UserDto";

interface WsChatUserMutedDto extends UserDto {
    muted: string;
}

export type { WsChatUserMutedDto }
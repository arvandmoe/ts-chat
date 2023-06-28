import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export abstract class WsRPCRequestDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    public key!: string;
}

import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { TransformNumber } from "../../../common/transformers/transform-number";
import { WsRPCRequestDto } from "../../../common/dtos/ws-rpc-request.dto";

export class WsChatMessageSendDto extends WsRPCRequestDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    public message!: string;

    @Expose()
    @IsOptional()
    @TransformNumber()
    @IsInt()
    @Min(1)
    public reply_to?: number;
}

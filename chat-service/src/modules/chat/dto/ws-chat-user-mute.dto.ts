import { Expose } from "class-transformer";
import { IsBoolean, IsInt, Min } from "class-validator";
import { TransformBoolean } from "../../../common/transformers/transform-boolean";
import { TransformNumber } from "../../../common/transformers/transform-number";
import { WsRPCRequestDto } from "../../../common/dtos/ws-rpc-request.dto";

export class WsChatUserMuteDto extends WsRPCRequestDto {
    @Expose()
    @TransformNumber()
    @IsInt()
    @Min(1)
    public user_id!: number;

    @Expose()
    @TransformBoolean()
    @IsBoolean()
    public mute!: boolean;
}

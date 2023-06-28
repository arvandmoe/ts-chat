import { WsRPCRequestDto } from "../../../common/dtos/ws-rpc-request.dto";
export declare class WsChatUserMuteDto extends WsRPCRequestDto {
    user_id: number;
    mute: boolean;
}

import { WsRPCRequestDto } from "../../../common/dtos/ws-rpc-request.dto";
export declare class WsChatMessageSendDto extends WsRPCRequestDto {
    message: string;
    reply_to?: number;
}

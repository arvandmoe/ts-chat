import { ResponseDto } from "./response.dto";
import { WsRPCRequestDto } from "./ws-rpc-request.dto";
export declare class WsRPCResponseDto<T> extends ResponseDto {
    result: T;
    key: string;
    constructor(key: string | WsRPCRequestDto, result: T);
}

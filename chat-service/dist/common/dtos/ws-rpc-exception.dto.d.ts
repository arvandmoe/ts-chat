import { WsExceptionDto } from "./ws-exception.dto";
export declare class WsRPCExceptionDto extends WsExceptionDto {
    key: string;
    constructor(key: string, error?: Error | string);
}

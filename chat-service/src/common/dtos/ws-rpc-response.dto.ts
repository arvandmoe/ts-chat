import { Expose } from "class-transformer";
import { ResponseDto } from "./response.dto";
import { WsRPCRequestDto } from "./ws-rpc-request.dto";

export class WsRPCResponseDto<T> extends ResponseDto {
    @Expose()
    public result: T;

    @Expose()
    public key: string;

    public constructor(key: string | WsRPCRequestDto, result: T) {
        super(200, "Ok");
        this.key = typeof key === "string" ? key : key.key;
        this.result = result;
    }
}

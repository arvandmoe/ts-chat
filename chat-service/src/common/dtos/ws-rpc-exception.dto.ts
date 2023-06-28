import { Expose } from "class-transformer";
import { WsExceptionDto } from "./ws-exception.dto";

export class WsRPCExceptionDto extends WsExceptionDto {
    @Expose()
    public key: string;

    public constructor(key: string, error?: Error | string) {
        super(error);
        this.key = key;
    }
}

import { ExceptionDto } from "./exception.dto";

export class WsExceptionDto extends ExceptionDto {
    public constructor(error?: Error | string) {
        super(error);
    }
}

import { ExceptionDto } from "./exception.dto";
import { Request } from "express";

export class RestExceptionDto extends ExceptionDto {
    public constructor(request: Request, error?: Error | string) {
        super(
            error,
            `Cannot ${request.method} ${request.url}`
        );
    }
}

import { ExceptionDto } from "./exception.dto";
import { Request } from "express";
export declare class RestExceptionDto extends ExceptionDto {
    constructor(request: Request, error?: Error | string);
}

import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { ExceptionDto } from "../dtos/exception.dto";
import { ExtendedLogger } from "../extended-logger";
import { Request } from "express";
export declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger?;
    constructor(logger?: ExtendedLogger | undefined);
    catch(exception: unknown, host: ArgumentsHost): void;
    getExceptionDto(request: Request, error?: Error | string): ExceptionDto;
}

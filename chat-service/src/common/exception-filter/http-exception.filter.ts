import { ArgumentsHost, Catch, ExceptionFilter, ServiceUnavailableException } from "@nestjs/common";
import { ExceptionDto } from "../dtos/exception.dto";
import { ExtendedLogger } from "../extended-logger";
import { Request, Response } from "express";
import { RestExceptionDto } from "../dtos/rest-exception.dto";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    public constructor(private readonly logger?: ExtendedLogger) { }

    public catch(exception: unknown, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();

        const result = this.getExceptionDto(
            request,
            typeof exception === "string" || exception instanceof Error ? exception : undefined
        );

        if (!(exception instanceof ServiceUnavailableException)) {
            this.logger?.debugEx(
                {
                    message: result.message,
                    exception: typeof exception === "string" || exception instanceof Error ? exception : undefined,
                }
            );
        }

        response.status(result.status_code).json(result);
    }

    public getExceptionDto(request: Request, error?: Error | string): ExceptionDto {
        return new RestExceptionDto(request, error);
    }
}

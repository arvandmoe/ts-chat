import { Expose } from "class-transformer";
import { HttpException } from "@nestjs/common";
import { ResponseDto } from "./response.dto";
import { ServiceException } from "../exceptions/service.exception";

export class ExceptionDto extends ResponseDto {
    @Expose()
    public readonly error: string;

    @Expose()
    public readonly error_code?: string;

    public constructor(error?: Error | string, message?: string) {
        super(
            error instanceof HttpException ? error.getStatus() : 500,
            message ?? (error instanceof Error ? error.name : "Internal Server Error")
        );

        if (error instanceof Error) {
            this.error = error.message;
            if (error instanceof ServiceException) {
                this.error_code = error.errorCode as string;
            }
        } else {
            this.error = error ?? "Unknown Error";
        }
    }

    public toString(): string {
        return `${this.message}: ${this.status_code} [${this.error_code ?? "-"}] - ${this.error}`;
    }
}

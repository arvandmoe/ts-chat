import { ResponseDto } from "./response.dto";
export declare class ExceptionDto extends ResponseDto {
    readonly error: string;
    readonly error_code?: string;
    constructor(error?: Error | string, message?: string);
    toString(): string;
}

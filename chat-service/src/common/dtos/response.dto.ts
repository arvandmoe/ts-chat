import { Expose } from "class-transformer";

export class ResponseDto {
    @Expose()
    public readonly status_code: number;

    @Expose()
    public readonly message: string;

    public constructor(status = 200, message = "Ok") {
        this.status_code = status;
        this.message = message;
    }
}

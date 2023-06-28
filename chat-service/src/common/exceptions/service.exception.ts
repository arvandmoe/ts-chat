import { BadRequestException } from "@nestjs/common";

export class ServiceException<T extends string = string> extends BadRequestException {
    public errorCode?: T;

    public constructor(errorCode?: T, message?: string, objectOrError?: string) {
        super(objectOrError, message);
        this.errorCode = errorCode;
    }
}

import { BadRequestException } from "@nestjs/common";
export declare class ServiceException<T extends string = string> extends BadRequestException {
    errorCode?: T;
    constructor(errorCode?: T, message?: string, objectOrError?: string);
}

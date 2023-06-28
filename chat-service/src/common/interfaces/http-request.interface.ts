import { JwtPayload } from "./jwt-payload.interface";
import { Request } from "express";
import { RequestUser } from "./request-user.interface";

export interface HttpRequest<T extends RequestUser = RequestUser> extends Request {
    authInfo?: JwtPayload;
    user?: T;
}

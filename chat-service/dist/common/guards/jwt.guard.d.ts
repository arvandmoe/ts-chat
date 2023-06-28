import { BaseJwtGuard } from "./base-jwt.guard";
import { RequestAuthenticator } from "../interfaces/request-authenticator.interface";
export declare class JwtGuard extends BaseJwtGuard {
    constructor(authService: RequestAuthenticator);
}

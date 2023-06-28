import { BaseJwtGuard } from "./base-jwt.guard";
import { Constants } from "../constants";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { RequestAuthenticator } from "../interfaces/request-authenticator.interface";

/**
 * Validates JWT token and fills the appropriate fields with the payload and user
 * information related to the token
 * But, if the token is absent, it is still a successful authentication. This case when
 * required should be caught with other guards like JwtAuthenticatedGuard or UserAuthenticatedGuard
 */
@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class JwtGuard extends BaseJwtGuard {
    public constructor(@Inject(forwardRef(() => Constants.RequestAuthenticatorProvider)) authService: RequestAuthenticator) {
        super(false, false, authService);
    }
}

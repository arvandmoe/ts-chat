import { JwtPayload } from "./jwt-payload.interface";
import { RequestUser } from "./request-user.interface";

export interface RequestAuthenticator {
    verifyRequestToken(token: string, extend: boolean): JwtPayload | undefined;
    getRequestUser(payload: JwtPayload): Promise<RequestUser | undefined>;
}

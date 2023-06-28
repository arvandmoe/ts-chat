import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { RequestContext } from "@medibloc/nestjs-request-context";
export declare class ExtendedRequestContext extends RequestContext {
    authInfo?: JwtPayload;
    method?: string;
    url?: string;
}

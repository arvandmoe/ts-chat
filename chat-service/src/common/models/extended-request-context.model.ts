import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { RequestContext } from "@medibloc/nestjs-request-context";

export class ExtendedRequestContext extends RequestContext {
    public authInfo?: JwtPayload;
    public method?: string;
    public url?: string;
}

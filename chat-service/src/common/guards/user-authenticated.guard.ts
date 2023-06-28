import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { HttpRequest } from "../interfaces/http-request.interface";
import { SocketClient } from "../interfaces/socket-client.interface";

/**
 * Checks request user information existence
 */
@Injectable()
export class UserAuthenticatedGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        let httpRequest = context.getType() === "http" ? context.switchToHttp().getRequest<HttpRequest>() : undefined;
        let websocketRequest = context.getType() === "ws" ? context.switchToWs().getClient<SocketClient>() : undefined;

        if (typeof httpRequest !== "object") {
            httpRequest = undefined;
        }

        if (typeof websocketRequest !== "object") {
            websocketRequest = undefined;
        }

        return !!(httpRequest?.user ?? websocketRequest?.user);
    }
}

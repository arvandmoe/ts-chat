import { CanActivate, ExecutionContext, Logger } from "@nestjs/common";
import { ExtendedRequestContext } from "../models/extended-request-context.model";
import { ExtractJwt } from "passport-jwt";
import { HttpRequest } from "../interfaces/http-request.interface";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Request } from "express";
import { RequestAuthenticator } from "../interfaces/request-authenticator.interface";
import { RequestContext } from "@medibloc/nestjs-request-context";
import { Socket } from "socket.io";
import { SocketClient } from "../interfaces/socket-client.interface";

export abstract class BaseJwtGuard implements CanActivate {
    private static readonly getRequestJWTString = ExtractJwt.fromAuthHeaderAsBearerToken();
    private logger = new Logger("jwt-guard");

    public constructor(
        private isExtend: boolean,
        private validateUser: boolean,
        private readonly authService: RequestAuthenticator
    ) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            let httpRequest = context.getType() === "http" ? context.switchToHttp().getRequest<HttpRequest>() : undefined;
            let websocketRequest = context.getType() === "ws" ? context.switchToWs().getClient<SocketClient>() : undefined;
            const requestContext: ExtendedRequestContext | undefined = RequestContext.get<ExtendedRequestContext>() ?? { };

            if (typeof httpRequest !== "object") {
                httpRequest = undefined;
            } else {
                requestContext.method = httpRequest.method;
                requestContext.url = httpRequest.originalUrl;
            }

            if (typeof websocketRequest !== "object") {
                websocketRequest = undefined;
            } else {
                requestContext.method = "WS";
            }

            const httpPayload = httpRequest ? this.getRequestJWTPayload(httpRequest) : undefined;
            const socketPayload = websocketRequest ? this.getSocketJWTPayload(websocketRequest) : undefined;

            const payload = httpPayload ?? socketPayload;
            if (!payload) {
                return !this.validateUser;
            } else {
                requestContext.authInfo = payload;
            }

            const user = await this.authService?.getRequestUser(payload);

            // isExtend requests will have the authInfo,
            // but normal request will not if the payload is no accepted
            if (!user && (!this.isExtend || !!this.validateUser)) {
                return !this.validateUser;
            }

            if (httpRequest) {
                httpRequest.authInfo = payload;
                httpRequest.user = user;
            }

            if (websocketRequest) {
                websocketRequest.authInfo = payload;
                websocketRequest.user = user;
            }

            return true;
        } catch (error) {
            this.logger.debug(error);
            return false;
        }
    }

    public getRequestJWTPayload(request: Request): JwtPayload | undefined {
        const jwt = BaseJwtGuard.getRequestJWTString(request);

        if (!jwt) {
            return undefined;
        }

        return this.authService?.verifyRequestToken(jwt, this.isExtend);
    }

    public getSocketJWTPayload(socket: Socket): JwtPayload | undefined {
        if (typeof socket.handshake.query !== "object") {
            return undefined;
        }

        const jwt = socket.handshake.query?.jwt;
        if (typeof jwt !== "string" || !jwt) {
            return undefined;
        }

        return this.authService?.verifyRequestToken(jwt, this.isExtend);
    }
}

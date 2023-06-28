import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Request } from "express";
import { RequestAuthenticator } from "../interfaces/request-authenticator.interface";
import { Socket } from "socket.io";
export declare abstract class BaseJwtGuard implements CanActivate {
    private isExtend;
    private validateUser;
    private readonly authService;
    private static readonly getRequestJWTString;
    private logger;
    constructor(isExtend: boolean, validateUser: boolean, authService: RequestAuthenticator);
    canActivate(context: ExecutionContext): Promise<boolean>;
    getRequestJWTPayload(request: Request): JwtPayload | undefined;
    getSocketJWTPayload(socket: Socket): JwtPayload | undefined;
}

import { JwtPayload } from "./jwt-payload.interface";
import { RequestUser } from "./request-user.interface";
import { Socket } from "socket.io";
export interface SocketClient<T extends RequestUser = RequestUser> extends Socket {
    authInfo?: JwtPayload;
    user?: T;
    lang?: string;
}

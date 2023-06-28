import { JwtPayload } from "../../common/interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { RequestAuthenticator } from "../../common/interfaces/request-authenticator.interface";
import { UserModel } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
export declare class AuthService implements RequestAuthenticator {
    private jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    verifyRequestToken(token: string): JwtPayload | undefined;
    getRequestUser(payload: JwtPayload): Promise<UserModel | undefined>;
    createAndSignToken(user: UserModel): Promise<string>;
}

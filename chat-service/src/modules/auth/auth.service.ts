import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "../../common/interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { RequestAuthenticator } from "../../common/interfaces/request-authenticator.interface";
import { UserModel } from "../users/models/user.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService implements RequestAuthenticator {
    public constructor(
        private jwtService: JwtService,
        private readonly usersService: UsersService
    ) { }

    public verifyRequestToken(token: string): JwtPayload | undefined {
        return this.jwtService.verify<JwtPayload>(token) ?? undefined;
    }

    public getRequestUser(payload: JwtPayload): Promise<UserModel | undefined> {
        if (!payload.uid) {
            throw new UnauthorizedException();
        }

        const user = this.usersService.getUser(payload.uid);
        if (!user) {
            throw new UnauthorizedException();
        }

        return Promise.resolve(user);
    }

    public async createAndSignToken(user: UserModel): Promise<string> {
        return this.jwtService.signAsync(
            {
                sub: user.userId,
                uid: user.userId,
                avatar: user.userAvatar,
                name: user.userName,
            } as Omit<JwtPayload, "exp" | "iss" | "iat">
        );
    }
}

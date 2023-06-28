import { AuthenticationTokenDto } from "./dto/authentication-token.dto";
import { AuthService } from "./auth.service";
import { HttpRequest } from "../../common/interfaces/http-request.interface";
import { MeDto } from "./dto/me.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserModel } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    getMe(request: HttpRequest<UserModel>): MeDto;
    register(request: HttpRequest<UserModel>, dto: RegisterDto): Promise<AuthenticationTokenDto>;
}

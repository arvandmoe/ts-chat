import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthenticationTokenDto } from "./dto/authentication-token.dto";
import { AuthService } from "./auth.service";
import {
    BadRequestException, Body, Controller, Get, Post, Req, UnauthorizedException, UseFilters, UseGuards
} from "@nestjs/common";
import { ExtendedLogger } from "../../common/extended-logger";
import { HttpExceptionFilter } from "../../common/exception-filter/http-exception.filter";
import { HttpRequest } from "../../common/interfaces/http-request.interface";
import { JwtGuard } from "../../common/guards/jwt.guard";
import { MeDto } from "./dto/me.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserAuthenticatedGuard } from "../../common/guards/user-authenticated.guard";
import { UserModel } from "../users/models/user.model";
import { UsersService } from "../users/users.service";

@Controller("auth")
@ApiTags("Authentication")
@UseFilters(new HttpExceptionFilter(new ExtendedLogger("auth-controller")))
export class AuthController {
    public constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    @ApiOperation(
        {
            summary: "Query current user information",
        }
    )
    @ApiResponse({ status: 200, description: "OK", type: MeDto })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiBearerAuth()
    @UseGuards(JwtGuard, UserAuthenticatedGuard)
    @Get("/me")
    public getMe(@Req() request: HttpRequest<UserModel>): MeDto {
        if (!request.user) {
            throw new UnauthorizedException();
        }

        return MeDto.fromModel(request.user);
    }

    @ApiOperation(
        {
            summary: "Create a new user",
        }
    )
    @ApiResponse({ status: 200, description: "OK", type: AuthenticationTokenDto })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @Post("/me")
    public async register(@Req() request: HttpRequest<UserModel>, @Body() dto: RegisterDto): Promise<AuthenticationTokenDto> {
        if (!!request.authInfo) {
            throw new BadRequestException();
        }

        const user = this.usersService.registerUser(dto.user_name);
        const token = await this.authService.createAndSignToken(user);

        return AuthenticationTokenDto.fromModel(user, token);
    }
}

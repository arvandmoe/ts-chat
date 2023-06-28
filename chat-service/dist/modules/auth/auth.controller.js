"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const swagger_1 = require("@nestjs/swagger");
const authentication_token_dto_1 = require("./dto/authentication-token.dto");
const auth_service_1 = require("./auth.service");
const common_1 = require("@nestjs/common");
const extended_logger_1 = require("../../common/extended-logger");
const http_exception_filter_1 = require("../../common/exception-filter/http-exception.filter");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
const me_dto_1 = require("./dto/me.dto");
const register_dto_1 = require("./dto/register.dto");
const user_authenticated_guard_1 = require("../../common/guards/user-authenticated.guard");
const users_service_1 = require("../users/users.service");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    getMe(request) {
        if (!request.user) {
            throw new common_1.UnauthorizedException();
        }
        return me_dto_1.MeDto.fromModel(request.user);
    }
    async register(request, dto) {
        if (!!request.authInfo) {
            throw new common_1.BadRequestException();
        }
        const user = this.usersService.registerUser(dto.user_name);
        const token = await this.authService.createAndSignToken(user);
        return authentication_token_dto_1.AuthenticationTokenDto.fromModel(user, token);
    }
};
__decorate([
    swagger_1.ApiOperation({
        summary: "Query current user information",
    }),
    swagger_1.ApiResponse({ status: 200, description: "OK", type: me_dto_1.MeDto }),
    swagger_1.ApiResponse({ status: 401, description: "Unauthorized" }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_guard_1.JwtGuard, user_authenticated_guard_1.UserAuthenticatedGuard),
    common_1.Get("/me"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", me_dto_1.MeDto)
], AuthController.prototype, "getMe", null);
__decorate([
    swagger_1.ApiOperation({
        summary: "Create a new user",
    }),
    swagger_1.ApiResponse({ status: 200, description: "OK", type: authentication_token_dto_1.AuthenticationTokenDto }),
    swagger_1.ApiResponse({ status: 400, description: "Bad Request" }),
    common_1.Post("/me"),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    common_1.Controller("auth"),
    swagger_1.ApiTags("Authentication"),
    common_1.UseFilters(new http_exception_filter_1.HttpExceptionFilter(new extended_logger_1.ExtendedLogger("auth-controller"))),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
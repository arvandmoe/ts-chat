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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationTokenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const me_dto_1 = require("./me.dto");
class AuthenticationTokenDto {
    static fromModel(model, token) {
        return class_transformer_1.plainToClass(AuthenticationTokenDto, {
            user: me_dto_1.MeDto.fromModel(model),
            token,
        });
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: "The user's information",
        type: me_dto_1.MeDto,
        readOnly: true,
    }),
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => me_dto_1.MeDto),
    __metadata("design:type", me_dto_1.MeDto)
], AuthenticationTokenDto.prototype, "user", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: "Contains the JWT token",
        type: "string",
        readOnly: true,
    }),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], AuthenticationTokenDto.prototype, "token", void 0);
exports.AuthenticationTokenDto = AuthenticationTokenDto;
//# sourceMappingURL=authentication-token.dto.js.map
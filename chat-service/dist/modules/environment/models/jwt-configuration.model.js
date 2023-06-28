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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtConfiguration = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_number_1 = require("../../../common/transformers/transform-number");
const number_helper_1 = __importDefault(require("../../../common/helpers/number.helper"));
class JwtConfiguration {
    static getDefault() {
        return {
            ...new JwtConfiguration(),
            lifetime: 12 * 60 * 60,
            issuer: "example.com",
            secretKey: "SECRET",
        };
    }
    static fromEnvironment() {
        const environment = process.env;
        return {
            issuer: environment.JWT_ISSUER,
            lifetime: environment.JWT_LIFETIME ? number_helper_1.default.getAsNumber(environment.JWT_LIFETIME) : undefined,
            secretKey: environment.JWT_SECRET_KEY,
        };
    }
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], JwtConfiguration.prototype, "issuer", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    transform_number_1.TransformNumber(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(60),
    class_validator_1.Max(60 * 60 * 24 * 30),
    __metadata("design:type", Number)
], JwtConfiguration.prototype, "lifetime", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], JwtConfiguration.prototype, "secretKey", void 0);
exports.JwtConfiguration = JwtConfiguration;
//# sourceMappingURL=jwt-configuration.model.js.map
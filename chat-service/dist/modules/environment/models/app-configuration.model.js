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
exports.AppConfiguration = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_number_1 = require("../../../common/transformers/transform-number");
const number_helper_1 = __importDefault(require("../../../common/helpers/number.helper"));
class AppConfiguration {
    static getDefault() {
        return {
            ...new AppConfiguration(),
            port: 3000,
            configFileName: `config/${process.env.NODE_ENV || "development"}.yml`,
        };
    }
    static fromEnvironment() {
        const environment = process.env;
        return {
            port: environment.APP_PORT ? number_helper_1.default.getAsInteger(environment.APP_PORT) : undefined,
            configFileName: environment.APP_CONFIG_FILE_NAME,
        };
    }
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    transform_number_1.TransformNumber(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(1024),
    class_validator_1.Max(65535),
    __metadata("design:type", Number)
], AppConfiguration.prototype, "port", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AppConfiguration.prototype, "configFileName", void 0);
exports.AppConfiguration = AppConfiguration;
//# sourceMappingURL=app-configuration.model.js.map
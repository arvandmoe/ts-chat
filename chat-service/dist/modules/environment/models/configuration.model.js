"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const yaml = __importStar(require("js-yaml"));
const app_configuration_model_1 = require("./app-configuration.model");
const chat_configuration_model_1 = require("./chat-configuration.model");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const jwt_configuration_model_1 = require("./jwt-configuration.model");
const lodash_1 = __importDefault(require("lodash"));
class Configuration {
    static async fromYAML(content) {
        const configFile = yaml.load(content);
        const loadedConfigFile = class_transformer_1.plainToClass(Configuration, configFile, { excludeExtraneousValues: true });
        const validationErrors = await class_validator_1.validate(loadedConfigFile);
        if (validationErrors.length > 0) {
            throw Configuration.getValidationError(validationErrors, "Invalid config file provided.");
        }
        return class_transformer_1.classToPlain(loadedConfigFile);
    }
    static async fromEnvironment() {
        const loadedConfigFile = class_transformer_1.plainToClass(Configuration, {
            app: app_configuration_model_1.AppConfiguration.fromEnvironment(),
            jwt: jwt_configuration_model_1.JwtConfiguration.fromEnvironment(),
            chat: chat_configuration_model_1.ChatConfiguration.fromEnvironment(),
        });
        const validationErrors = await class_validator_1.validate(loadedConfigFile);
        if (validationErrors.length > 0) {
            throw Configuration.getValidationError(validationErrors, "Invalid environment variables provided.");
        }
        return class_transformer_1.classToPlain(loadedConfigFile);
    }
    static getDefault() {
        return {
            app: app_configuration_model_1.AppConfiguration.getDefault(),
            jwt: jwt_configuration_model_1.JwtConfiguration.getDefault(),
            chat: chat_configuration_model_1.ChatConfiguration.getDefault(),
        };
    }
    static getValidationError(errors, message) {
        if (!errors.length) {
            return;
        }
        errors = lodash_1.default.flatMapDeep(errors, (e) => !!e.children ? [e, ...e.children] : [e]);
        const errorMessage = errors.map((e) => { var _a; return `-- ${e.property}: "${String(e.value)}" | ${lodash_1.default.toPairs((_a = e.constraints) !== null && _a !== void 0 ? _a : {}).map((p) => `${p[0]} - ${p[1]}`).join(", ") || "Nested"}`; }).join("\r\n");
        message = message + (!!errorMessage ? `\r\n${errorMessage}` : "");
        return new Error(message);
    }
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsObject(),
    class_transformer_1.Type(() => app_configuration_model_1.AppConfiguration),
    class_validator_1.ValidateNested(),
    __metadata("design:type", app_configuration_model_1.AppConfiguration)
], Configuration.prototype, "app", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsObject(),
    class_transformer_1.Type(() => jwt_configuration_model_1.JwtConfiguration),
    class_validator_1.ValidateNested(),
    __metadata("design:type", jwt_configuration_model_1.JwtConfiguration)
], Configuration.prototype, "jwt", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsObject(),
    class_transformer_1.Type(() => chat_configuration_model_1.ChatConfiguration),
    class_validator_1.ValidateNested(),
    __metadata("design:type", chat_configuration_model_1.ChatConfiguration)
], Configuration.prototype, "chat", void 0);
exports.Configuration = Configuration;
//# sourceMappingURL=configuration.model.js.map
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
exports.ChatConfiguration = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_number_1 = require("../../../common/transformers/transform-number");
const number_helper_1 = __importDefault(require("../../../common/helpers/number.helper"));
class ChatConfiguration {
    static getDefault() {
        return {
            ...new ChatConfiguration(),
            history: 50,
            maxMessagePerMinute: 10,
        };
    }
    static fromEnvironment() {
        const environment = process.env;
        return {
            history: environment.CHAT_HISTORY ? number_helper_1.default.getAsInteger(environment.CHAT_HISTORY) : undefined,
            maxMessagePerMinute: environment.CHAT_MAX_MESSAGES_PER_MINUTE ? number_helper_1.default.getAsInteger(environment.CHAT_MAX_MESSAGES_PER_MINUTE) : undefined,
        };
    }
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    transform_number_1.TransformNumber(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(1),
    class_validator_1.Max(1000),
    __metadata("design:type", Number)
], ChatConfiguration.prototype, "history", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    transform_number_1.TransformNumber(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(1),
    class_validator_1.Max(1000),
    __metadata("design:type", Number)
], ChatConfiguration.prototype, "maxMessagePerMinute", void 0);
exports.ChatConfiguration = ChatConfiguration;
//# sourceMappingURL=chat-configuration.model.js.map
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
exports.WsChatMessageReplyToDto = void 0;
const class_transformer_1 = require("class-transformer");
const user_dto_1 = require("../../users/dtos/user.dto");
class WsChatMessageReplyToDto {
    static fromMessage(model) {
        return class_transformer_1.plainToClass(WsChatMessageReplyToDto, {
            id: model.id,
            message: model.message,
            user: model.user ? user_dto_1.UserDto.fromUser(model.user) : null,
            date: model.created,
        });
    }
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number)
], WsChatMessageReplyToDto.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], WsChatMessageReplyToDto.prototype, "message", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => user_dto_1.UserDto),
    __metadata("design:type", Object)
], WsChatMessageReplyToDto.prototype, "user", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Date)
], WsChatMessageReplyToDto.prototype, "date", void 0);
exports.WsChatMessageReplyToDto = WsChatMessageReplyToDto;
//# sourceMappingURL=ws-chat-message-reply-to.dto.js.map
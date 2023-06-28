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
exports.WsChatMessageDto = void 0;
const class_transformer_1 = require("class-transformer");
const ws_chat_message_reply_to_dto_1 = require("./ws-chat-message-reply-to.dto");
class WsChatMessageDto extends ws_chat_message_reply_to_dto_1.WsChatMessageReplyToDto {
    static fromMessage(model) {
        return class_transformer_1.plainToClass(WsChatMessageDto, {
            ...(ws_chat_message_reply_to_dto_1.WsChatMessageReplyToDto.fromMessage(model)),
            reply_to: !model.replyTo ? null : ws_chat_message_reply_to_dto_1.WsChatMessageReplyToDto.fromMessage(model.replyTo),
            date: model.created,
        });
    }
    static fromMessages(models) {
        return models.map((m) => WsChatMessageDto.fromMessage(m));
    }
}
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => ws_chat_message_reply_to_dto_1.WsChatMessageReplyToDto),
    __metadata("design:type", Object)
], WsChatMessageDto.prototype, "reply_to", void 0);
exports.WsChatMessageDto = WsChatMessageDto;
//# sourceMappingURL=ws-chat-message.dto.js.map
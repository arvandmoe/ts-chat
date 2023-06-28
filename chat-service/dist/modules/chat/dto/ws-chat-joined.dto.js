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
exports.WsChatJoinedDto = void 0;
const class_transformer_1 = require("class-transformer");
const ws_chat_message_dto_1 = require("./ws-chat-message.dto");
const ws_chat_status_dto_1 = require("./ws-chat-status.dto");
const ws_chat_user_muted_dto_1 = require("./ws-chat-user-muted.dto");
class WsChatJoinedDto extends ws_chat_status_dto_1.WsChatStatusDto {
    static fromMessagesAndMutedUsers(currentMembers, messages, mutedUsers) {
        return class_transformer_1.plainToClass(WsChatJoinedDto, {
            messages: ws_chat_message_dto_1.WsChatMessageDto.fromMessages(messages),
            last_message: !!messages.length ? messages[messages.length - 1].created : null,
            muted_users: mutedUsers ? ws_chat_user_muted_dto_1.WsChatUserMutedDto.fromMutedUsers(mutedUsers) : [],
            users: currentMembers,
        });
    }
}
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => ws_chat_message_dto_1.WsChatMessageDto),
    __metadata("design:type", Array)
], WsChatJoinedDto.prototype, "messages", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => ws_chat_user_muted_dto_1.WsChatUserMutedDto),
    __metadata("design:type", Array)
], WsChatJoinedDto.prototype, "muted_users", void 0);
exports.WsChatJoinedDto = WsChatJoinedDto;
//# sourceMappingURL=ws-chat-joined.dto.js.map
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
exports.WsChatStatusDto = void 0;
const class_transformer_1 = require("class-transformer");
class WsChatStatusDto {
    static fromInformation(currentMembers, lastMessage) {
        return class_transformer_1.plainToClass(WsChatStatusDto, {
            last_message: lastMessage !== null && lastMessage !== void 0 ? lastMessage : null,
            users: currentMembers,
        });
    }
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Object)
], WsChatStatusDto.prototype, "last_message", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number)
], WsChatStatusDto.prototype, "users", void 0);
exports.WsChatStatusDto = WsChatStatusDto;
//# sourceMappingURL=ws-chat-status.dto.js.map
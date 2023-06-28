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
exports.WsRPCResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const response_dto_1 = require("./response.dto");
class WsRPCResponseDto extends response_dto_1.ResponseDto {
    constructor(key, result) {
        super(200, "Ok");
        this.key = typeof key === "string" ? key : key.key;
        this.result = result;
    }
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Object)
], WsRPCResponseDto.prototype, "result", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], WsRPCResponseDto.prototype, "key", void 0);
exports.WsRPCResponseDto = WsRPCResponseDto;
//# sourceMappingURL=ws-rpc-response.dto.js.map
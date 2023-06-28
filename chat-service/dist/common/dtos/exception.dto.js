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
exports.ExceptionDto = void 0;
const class_transformer_1 = require("class-transformer");
const common_1 = require("@nestjs/common");
const response_dto_1 = require("./response.dto");
const service_exception_1 = require("../exceptions/service.exception");
class ExceptionDto extends response_dto_1.ResponseDto {
    constructor(error, message) {
        super(error instanceof common_1.HttpException ? error.getStatus() : 500, message !== null && message !== void 0 ? message : (error instanceof Error ? error.name : "Internal Server Error"));
        if (error instanceof Error) {
            this.error = error.message;
            if (error instanceof service_exception_1.ServiceException) {
                this.error_code = error.errorCode;
            }
        }
        else {
            this.error = error !== null && error !== void 0 ? error : "Unknown Error";
        }
    }
    toString() {
        var _a;
        return `${this.message}: ${this.status_code} [${(_a = this.error_code) !== null && _a !== void 0 ? _a : "-"}] - ${this.error}`;
    }
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ExceptionDto.prototype, "error", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ExceptionDto.prototype, "error_code", void 0);
exports.ExceptionDto = ExceptionDto;
//# sourceMappingURL=exception.dto.js.map
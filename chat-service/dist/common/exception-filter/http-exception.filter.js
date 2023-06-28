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
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const extended_logger_1 = require("../extended-logger");
const rest_exception_dto_1 = require("../dtos/rest-exception.dto");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        var _a;
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        const result = this.getExceptionDto(request, typeof exception === "string" || exception instanceof Error ? exception : undefined);
        if (!(exception instanceof common_1.ServiceUnavailableException)) {
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.debugEx({
                message: result.message,
                exception: typeof exception === "string" || exception instanceof Error ? exception : undefined,
            });
        }
        response.status(result.status_code).json(result);
    }
    getExceptionDto(request, error) {
        return new rest_exception_dto_1.RestExceptionDto(request, error);
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [extended_logger_1.ExtendedLogger])
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map
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
exports.WsExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const extended_logger_1 = require("../extended-logger");
const ws_exception_dto_1 = require("../dtos/ws-exception.dto");
const ws_rpc_exception_dto_1 = require("../dtos/ws-rpc-exception.dto");
let WsExceptionsFilter = class WsExceptionsFilter extends websockets_1.BaseWsExceptionFilter {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    catch(exception, host) {
        var _a;
        const context = host.switchToWs();
        const client = context.getClient();
        const data = context.getData();
        let result = new ws_exception_dto_1.WsExceptionDto(typeof exception === "string" || exception instanceof Error ? exception : undefined);
        if (typeof data === "object") {
            const rpcRequest = data;
            if (typeof rpcRequest.key === "string") {
                result = new ws_rpc_exception_dto_1.WsRPCExceptionDto(rpcRequest.key, typeof exception === "string" || exception instanceof Error ? exception : undefined);
            }
        }
        if (!(exception instanceof common_1.ServiceUnavailableException)) {
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.debugEx({
                message: result.message,
                exception: typeof exception === "string" || exception instanceof Error ? exception : undefined,
            });
        }
        client.emit("exception", result);
    }
};
WsExceptionsFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [extended_logger_1.ExtendedLogger])
], WsExceptionsFilter);
exports.WsExceptionsFilter = WsExceptionsFilter;
//# sourceMappingURL=ws-exception.filter.js.map
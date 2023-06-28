"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_jwt_1 = require("passport-jwt");
const nestjs_request_context_1 = require("@medibloc/nestjs-request-context");
class BaseJwtGuard {
    constructor(isExtend, validateUser, authService) {
        this.isExtend = isExtend;
        this.validateUser = validateUser;
        this.authService = authService;
        this.logger = new common_1.Logger("jwt-guard");
    }
    async canActivate(context) {
        var _a, _b;
        try {
            let httpRequest = context.getType() === "http" ? context.switchToHttp().getRequest() : undefined;
            let websocketRequest = context.getType() === "ws" ? context.switchToWs().getClient() : undefined;
            const requestContext = (_a = nestjs_request_context_1.RequestContext.get()) !== null && _a !== void 0 ? _a : {};
            if (typeof httpRequest !== "object") {
                httpRequest = undefined;
            }
            else {
                requestContext.method = httpRequest.method;
                requestContext.url = httpRequest.originalUrl;
            }
            if (typeof websocketRequest !== "object") {
                websocketRequest = undefined;
            }
            else {
                requestContext.method = "WS";
            }
            const httpPayload = httpRequest ? this.getRequestJWTPayload(httpRequest) : undefined;
            const socketPayload = websocketRequest ? this.getSocketJWTPayload(websocketRequest) : undefined;
            const payload = httpPayload !== null && httpPayload !== void 0 ? httpPayload : socketPayload;
            if (!payload) {
                return !this.validateUser;
            }
            else {
                requestContext.authInfo = payload;
            }
            const user = await ((_b = this.authService) === null || _b === void 0 ? void 0 : _b.getRequestUser(payload));
            if (!user && (!this.isExtend || !!this.validateUser)) {
                return !this.validateUser;
            }
            if (httpRequest) {
                httpRequest.authInfo = payload;
                httpRequest.user = user;
            }
            if (websocketRequest) {
                websocketRequest.authInfo = payload;
                websocketRequest.user = user;
            }
            return true;
        }
        catch (error) {
            this.logger.debug(error);
            return false;
        }
    }
    getRequestJWTPayload(request) {
        var _a;
        const jwt = BaseJwtGuard.getRequestJWTString(request);
        if (!jwt) {
            return undefined;
        }
        return (_a = this.authService) === null || _a === void 0 ? void 0 : _a.verifyRequestToken(jwt, this.isExtend);
    }
    getSocketJWTPayload(socket) {
        var _a, _b;
        if (typeof socket.handshake.query !== "object") {
            return undefined;
        }
        const jwt = (_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.jwt;
        if (typeof jwt !== "string" || !jwt) {
            return undefined;
        }
        return (_b = this.authService) === null || _b === void 0 ? void 0 : _b.verifyRequestToken(jwt, this.isExtend);
    }
}
exports.BaseJwtGuard = BaseJwtGuard;
BaseJwtGuard.getRequestJWTString = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken();
//# sourceMappingURL=base-jwt.guard.js.map
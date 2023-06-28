"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthenticatedGuard = void 0;
const common_1 = require("@nestjs/common");
let UserAuthenticatedGuard = class UserAuthenticatedGuard {
    canActivate(context) {
        var _a;
        let httpRequest = context.getType() === "http" ? context.switchToHttp().getRequest() : undefined;
        let websocketRequest = context.getType() === "ws" ? context.switchToWs().getClient() : undefined;
        if (typeof httpRequest !== "object") {
            httpRequest = undefined;
        }
        if (typeof websocketRequest !== "object") {
            websocketRequest = undefined;
        }
        return !!((_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) !== null && _a !== void 0 ? _a : websocketRequest === null || websocketRequest === void 0 ? void 0 : websocketRequest.user);
    }
};
UserAuthenticatedGuard = __decorate([
    common_1.Injectable()
], UserAuthenticatedGuard);
exports.UserAuthenticatedGuard = UserAuthenticatedGuard;
//# sourceMappingURL=user-authenticated.guard.js.map
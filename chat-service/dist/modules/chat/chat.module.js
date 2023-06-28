"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const chat_gateway_1 = require("./chat.gateway");
const chat_service_1 = require("./chat.service");
const environment_module_1 = require("../environment/environment.module");
const common_1 = require("@nestjs/common");
const users_module_1 = require("../users/users.module");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    common_1.Module({
        imports: [
            environment_module_1.EnvironmentModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
        ],
        providers: [chat_service_1.ChatService, chat_gateway_1.ChatGateway],
        controllers: [],
        exports: [chat_service_1.ChatService],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map
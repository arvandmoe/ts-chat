"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_module_1 = require("./modules/auth/auth.module");
const chat_module_1 = require("./modules/chat/chat.module");
const environment_module_1 = require("./modules/environment/environment.module");
const extended_logger_1 = require("./common/extended-logger");
const extended_request_context_model_1 = require("./common/models/extended-request-context.model");
const health_module_1 = require("./modules/health/health.module");
const common_1 = require("@nestjs/common");
const nestjs_request_context_1 = require("@medibloc/nestjs-request-context");
const schedule_1 = require("@nestjs/schedule");
const users_module_1 = require("./modules/users/users.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            environment_module_1.EnvironmentModule,
            nestjs_request_context_1.RequestContextModule.forRoot({
                contextClass: extended_request_context_model_1.ExtendedRequestContext,
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            chat_module_1.ChatModule,
        ],
        providers: [extended_logger_1.ExtendedLogger],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
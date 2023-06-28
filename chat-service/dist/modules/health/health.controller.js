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
exports.HealthController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
let HealthController = class HealthController {
    getHealth() {
        return "GOOD";
    }
};
__decorate([
    swagger_1.ApiOperation({
        summary: "Retrieves the service's health status",
    }),
    swagger_1.ApiResponse({ status: 200, description: "OK", type: String }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], HealthController.prototype, "getHealth", null);
HealthController = __decorate([
    common_1.Controller("health"),
    swagger_1.ApiTags("Health")
], HealthController);
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map
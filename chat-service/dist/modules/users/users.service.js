"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const extended_logger_1 = require("../../common/extended-logger");
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.logger = new extended_logger_1.ExtendedLogger("user-service");
        this.usersRepository = new Map();
        this.maxUserId = 0;
    }
    getUser(userId) {
        return this.usersRepository.get(userId);
    }
    registerUser(userName) {
        try {
            const userId = (++this.maxUserId);
            const user = {
                userId,
                userName,
                userAvatar: `https://i.pravatar.cc/150?img=${userId}`,
                created: new Date(),
            };
            this.usersRepository.set(userId, user);
            return user;
        }
        catch (error) {
            this.logger.errorEx({
                message: "Failed to register a new user",
                exception: error,
                meta: { userName },
            });
            throw error;
        }
    }
};
UsersService = __decorate([
    common_1.Injectable()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
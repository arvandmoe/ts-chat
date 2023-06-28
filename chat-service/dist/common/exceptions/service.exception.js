"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceException = void 0;
const common_1 = require("@nestjs/common");
class ServiceException extends common_1.BadRequestException {
    constructor(errorCode, message, objectOrError) {
        super(objectOrError, message);
        this.errorCode = errorCode;
    }
}
exports.ServiceException = ServiceException;
//# sourceMappingURL=service.exception.js.map
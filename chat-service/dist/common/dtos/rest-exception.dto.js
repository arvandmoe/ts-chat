"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestExceptionDto = void 0;
const exception_dto_1 = require("./exception.dto");
class RestExceptionDto extends exception_dto_1.ExceptionDto {
    constructor(request, error) {
        super(error, `Cannot ${request.method} ${request.url}`);
    }
}
exports.RestExceptionDto = RestExceptionDto;
//# sourceMappingURL=rest-exception.dto.js.map
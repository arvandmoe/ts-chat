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
var ExtendedLogger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedLogger = void 0;
const common_1 = require("@nestjs/common");
const nestjs_request_context_1 = require("@medibloc/nestjs-request-context");
let ExtendedLogger = ExtendedLogger_1 = class ExtendedLogger extends common_1.Logger {
    constructor(context) {
        super(context);
    }
    errorEx(info, context) {
        super.error(this.getMessageWithStack(info), context !== null && context !== void 0 ? context : this.context);
    }
    warnEx(info, context) {
        super.warn(this.getMessageWithStack(info), context !== null && context !== void 0 ? context : this.context);
    }
    debugEx(info, context) {
        super.debug(this.getMessageWithStack(info), context !== null && context !== void 0 ? context : this.context);
    }
    verboseEx(info, context) {
        super.verbose(this.getMessage(info), context !== null && context !== void 0 ? context : this.context);
    }
    logEx(info, context) {
        super.log(this.getMessage(info), context !== null && context !== void 0 ? context : this.context);
    }
    error(message, context) {
        if (message instanceof Error) {
            this.errorEx({ exception: message }, context);
        }
        else if (typeof message === "string") {
            this.errorEx({ message }, context);
        }
        else {
            super.error(message, context !== null && context !== void 0 ? context : this.context);
        }
    }
    warn(message, context) {
        if (message instanceof Error) {
            this.warnEx({ exception: message }, context);
        }
        else if (typeof message === "string") {
            this.warnEx({ message }, context);
        }
        else {
            super.warn(message, context !== null && context !== void 0 ? context : this.context);
        }
    }
    debug(message, context) {
        if (message instanceof Error) {
            this.debugEx({ exception: message }, context);
        }
        else if (typeof message === "string") {
            this.debugEx({ message }, context);
        }
        else {
            super.debug(message, context !== null && context !== void 0 ? context : this.context);
        }
    }
    verbose(message, context) {
        if (message instanceof Error) {
            this.verboseEx({ exception: message }, context);
        }
        else if (typeof message === "string") {
            this.verboseEx({ message }, context);
        }
        else {
            super.verbose(message, context !== null && context !== void 0 ? context : this.context);
        }
    }
    log(message, context) {
        if (message instanceof Error) {
            this.logEx({ exception: message }, context);
        }
        else if (typeof message === "string") {
            this.logEx({ message }, context);
        }
        else {
            super.log(message, context !== null && context !== void 0 ? context : this.context);
        }
    }
    getMessage(info) {
        var _a, _b;
        const errorMessage = info.exception instanceof Error ?
            info.exception.message :
            (typeof info.exception === "string" ? info.exception : undefined);
        let message = (_b = (_a = info.message) !== null && _a !== void 0 ? _a : errorMessage) !== null && _b !== void 0 ? _b : "Unknown";
        if (!info.request) {
            info.request = nestjs_request_context_1.RequestContext.get();
        }
        if (!!errorMessage && errorMessage !== message) {
            message = message + ` [${errorMessage}]`;
        }
        if (!!info.meta && !!Object.keys(info.meta).length) {
            message = message + ` ${JSON.stringify(info.meta)}`;
        }
        if (!!info.request && !!Object.keys(info.request).length) {
            message = message + ` ${JSON.stringify(info.request)}`;
        }
        return message;
    }
    getMessageWithStack(info) {
        let message = this.getMessage(info);
        const errorStack = info.exception instanceof Error ? info.exception.stack : new Error().stack;
        if (errorStack) {
            let lines = errorStack.split("\n");
            if (!!lines.length) {
                let index;
                for (index = lines.length - 1; index >= 1; index--) {
                    if (!lines[index].includes(`at ${ExtendedLogger_1.name}`)) {
                        continue;
                    }
                    break;
                }
                lines = lines
                    .slice(index + 1)
                    .filter((line) => !!line.trim() && !line.includes("node_modules") && !line.includes("node:"));
                if (!!lines.length) {
                    message = message + `\n${lines.join("\n")}`;
                }
            }
        }
        return message;
    }
};
ExtendedLogger = ExtendedLogger_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [String])
], ExtendedLogger);
exports.ExtendedLogger = ExtendedLogger;
//# sourceMappingURL=extended-logger.js.map
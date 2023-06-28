import { ExtendedLogMessage } from "./interfaces/extended-log-message.interface";
import { Logger } from "@nestjs/common";
export declare class ExtendedLogger extends Logger {
    constructor(context: string);
    errorEx(info: ExtendedLogMessage, context?: string): void;
    warnEx(info: ExtendedLogMessage, context?: string): void;
    debugEx(info: ExtendedLogMessage, context?: string): void;
    verboseEx(info: ExtendedLogMessage, context?: string): void;
    logEx(info: ExtendedLogMessage, context?: string): void;
    error(message: unknown, context?: string): void;
    warn(message: unknown, context?: string): void;
    debug(message: unknown, context?: string): void;
    verbose(message: unknown, context?: string): void;
    log(message: unknown, context?: string): void;
    private getMessage;
    private getMessageWithStack;
}

import { ArgumentsHost } from "@nestjs/common";
import { BaseWsExceptionFilter } from "@nestjs/websockets";
import { ExtendedLogger } from "../extended-logger";
export declare class WsExceptionsFilter extends BaseWsExceptionFilter {
    private readonly logger?;
    constructor(logger?: ExtendedLogger | undefined);
    catch(exception: unknown, host: ArgumentsHost): void;
}

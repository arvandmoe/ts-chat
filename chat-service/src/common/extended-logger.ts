/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { ExtendedLogMessage } from "./interfaces/extended-log-message.interface";
import { ExtendedRequestContext } from "./models/extended-request-context.model";
import { Injectable, Logger } from "@nestjs/common";
import { RequestContext } from "@medibloc/nestjs-request-context";

@Injectable()
export class ExtendedLogger extends Logger {
    public constructor(context: string) {
        super(context);
    }

    public errorEx(info: ExtendedLogMessage, context?: string): void {
        super.error(this.getMessageWithStack(info), context ?? this.context);
    }

    public warnEx(info: ExtendedLogMessage, context?: string): void {
        super.warn(this.getMessageWithStack(info), context ?? this.context);
    }

    public debugEx(info: ExtendedLogMessage, context?: string): void {
        super.debug(this.getMessageWithStack(info), context ?? this.context);
    }

    public verboseEx(info: ExtendedLogMessage, context?: string): void {
        super.verbose(this.getMessage(info), context ?? this.context);
    }

    public logEx(info: ExtendedLogMessage, context?: string): void {
        super.log(this.getMessage(info), context ?? this.context);
    }

    /**
     * @deprecated Use errorEx instead
     */
    public error(message: unknown, context?: string): void {
        if (message instanceof Error) {
            this.errorEx({ exception: message }, context);
        } else if (typeof message === "string") {
            this.errorEx({ message }, context);
        } else {
            super.error(message, context ?? this.context);
        }
    }

    /**
     * @deprecated Use warnEx instead
     */
    public warn(message: unknown, context?: string): void {
        if (message instanceof Error) {
            this.warnEx({ exception: message }, context);
        } else if (typeof message === "string") {
            this.warnEx({ message }, context);
        } else {
            super.warn(message, context ?? this.context);
        }
    }

    /**
     * @deprecated Use debugEx instead
     */
    public debug(message: unknown, context?: string): void {
        if (message instanceof Error) {
            this.debugEx({ exception: message }, context);
        } else if (typeof message === "string") {
            this.debugEx({ message }, context);
        } else {
            super.debug(message, context ?? this.context);
        }
    }

    /**
     * @deprecated Use verboseEx instead
     */
    public verbose(message: unknown, context?: string): void {
        if (message instanceof Error) {
            this.verboseEx({ exception: message }, context);
        } else if (typeof message === "string") {
            this.verboseEx({ message }, context);
        } else {
            super.verbose(message, context ?? this.context);
        }
    }

    /**
     * @deprecated Use logEx instead
     */
    public log(message: unknown, context?: string): void {
        if (message instanceof Error) {
            this.logEx({ exception: message }, context);
        } else if (typeof message === "string") {
            this.logEx({ message }, context);
        } else {
            super.log(message, context ?? this.context);
        }
    }

    private getMessage(info: ExtendedLogMessage): string {
        const errorMessage = info.exception instanceof Error ?
            info.exception.message :
            (typeof info.exception === "string" ? info.exception : undefined);
        let message = info.message ?? errorMessage ?? "Unknown";

        if (!info.request) {
            info.request = RequestContext.get<ExtendedRequestContext>();
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

    private getMessageWithStack(info: ExtendedLogMessage): string {
        let message = this.getMessage(info);
        const errorStack = info.exception instanceof Error ? info.exception.stack : new Error().stack;
        if (errorStack) {
            let lines = errorStack.split("\n");
            if (!!lines.length) {
                let index: number;
                for (index = lines.length - 1; index >= 1; index--) {
                    if (!lines[index].includes(`at ${ExtendedLogger.name}`)) {
                        continue;
                    }

                    break;
                }

                lines = lines
                    .slice(index + 1)
                    .filter(
                        (line) => !!line.trim() && !line.includes("node_modules") && !line.includes("node:")
                    );

                if (!!lines.length) {
                    message = message + `\n${lines.join("\n")}`;
                }
            }
        }

        return message;
    }
}

import { ExtendedRequestContext } from "../models/extended-request-context.model";
export interface ExtendedLogMessage {
    message?: string;
    meta?: Record<string, unknown>;
    exception?: unknown;
    request?: ExtendedRequestContext;
}

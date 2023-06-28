import { ArgumentsHost, Catch, ServiceUnavailableException } from "@nestjs/common";
import { BaseWsExceptionFilter } from "@nestjs/websockets";
import { ExtendedLogger } from "../extended-logger";
import { Socket } from "socket.io";
import { WsExceptionDto } from "../dtos/ws-exception.dto";
import { WsRPCExceptionDto } from "../dtos/ws-rpc-exception.dto";
import { WsRPCRequestDto } from "../dtos/ws-rpc-request.dto";

@Catch()
export class WsExceptionsFilter extends BaseWsExceptionFilter {
    public constructor(private readonly logger?: ExtendedLogger) {
        super();
    }

    public catch(exception: unknown, host: ArgumentsHost): void {
        const context = host.switchToWs();
        const client = context.getClient<Socket>();
        const data = context.getData<unknown>();

        let result = new WsExceptionDto(
            typeof exception === "string" || exception instanceof Error ? exception : undefined
        );

        if (typeof data === "object") {
            const rpcRequest = data as WsRPCRequestDto;
            if (typeof rpcRequest.key === "string") {
                result = new WsRPCExceptionDto(
                    rpcRequest.key,
                    typeof exception === "string" || exception instanceof Error ? exception : undefined
                );
            }
        }

        if (!(exception instanceof ServiceUnavailableException)) {
            this.logger?.debugEx(
                {
                    message: result.message,
                    exception: typeof exception === "string" || exception instanceof Error ? exception : undefined,
                }
            );
        }

        client.emit("exception", result);
    }
}

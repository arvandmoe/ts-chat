interface WsRPCExceptionDto {
    status_code: number;
    message: string;
    key: string;
    error: string;
    error_code?: string;
}

export type { WsRPCExceptionDto }
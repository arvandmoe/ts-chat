interface WsRPCResponseDto<T> {
    status_code: number;
    message: string;
    key: string;
    result: T;
}

export type { WsRPCResponseDto }
export declare class JwtConfiguration {
    issuer?: string;
    lifetime?: number;
    secretKey?: string;
    static getDefault(): Required<JwtConfiguration>;
    static fromEnvironment(): Partial<JwtConfiguration>;
}

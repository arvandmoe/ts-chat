export declare class AppConfiguration {
    port?: number;
    configFileName?: string;
    static getDefault(): Required<AppConfiguration>;
    static fromEnvironment(): Partial<AppConfiguration>;
}

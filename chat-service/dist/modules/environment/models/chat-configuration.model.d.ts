export declare class ChatConfiguration {
    history?: number;
    maxMessagePerMinute?: number;
    static getDefault(): Required<ChatConfiguration>;
    static fromEnvironment(): Partial<ChatConfiguration>;
}

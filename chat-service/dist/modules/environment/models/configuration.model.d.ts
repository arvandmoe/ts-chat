import { AppConfiguration } from "./app-configuration.model";
import { ChatConfiguration } from "./chat-configuration.model";
import { DeepRequired } from "src/types/utility-types";
import { JwtConfiguration } from "./jwt-configuration.model";
export declare class Configuration {
    app?: AppConfiguration;
    jwt?: JwtConfiguration;
    chat?: ChatConfiguration;
    static fromYAML(content: string): Promise<Partial<Configuration>>;
    static fromEnvironment(): Promise<Partial<Configuration>>;
    static getDefault(): DeepRequired<Configuration>;
    private static getValidationError;
}

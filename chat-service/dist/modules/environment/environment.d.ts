import { Configuration } from "./models/configuration.model";
import { DeepRequired } from "src/types/utility-types";
export declare class Environment {
    readonly config: DeepRequired<Configuration>;
    readonly isInDevelopment: boolean;
    constructor(isInDevelopment: boolean, configuration: DeepRequired<Configuration>);
    static getSnapshot(): Promise<Environment>;
    static get isInDevelopment(): boolean;
    static get isInTest(): boolean;
    static getConfig(): Promise<DeepRequired<Configuration>>;
    private static cleanupConfiguration;
}

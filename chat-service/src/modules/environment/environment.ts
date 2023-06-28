import * as fs from "fs";
import { AppConfiguration } from "./models/app-configuration.model";
import { config } from "dotenv";
import { Configuration } from "./models/configuration.model";
import { DeepRequired } from "src/types/utility-types";
import _ from "lodash";

config();

export class Environment {
    public readonly config: DeepRequired<Configuration>;
    public readonly isInDevelopment: boolean;

    public constructor(isInDevelopment: boolean, configuration: DeepRequired<Configuration>) {
        this.isInDevelopment = isInDevelopment;
        this.config = configuration;
    }

    public static async getSnapshot(): Promise<Environment> {
        return new Environment(
            this.isInDevelopment,
            await this.getConfig()
        );
    }

    public static get isInDevelopment(): boolean {
        const nodeEnvironment = (process.env.NODE_ENV ?? "").trim().toLowerCase();
        return nodeEnvironment === "dev" || nodeEnvironment === "development";
    }

    public static get isInTest(): boolean {
        const nodeEnvironment = (process.env.NODE_ENV ?? "").trim().toLowerCase();
        return nodeEnvironment === "test";
    }

    public static async getConfig(): Promise<DeepRequired<Configuration>> {
        const configEnvironment = await Configuration.fromEnvironment();
        const configFileName = configEnvironment.app?.configFileName ?? AppConfiguration.getDefault().configFileName;

        if (!fs.existsSync(configFileName)) {
            throw new Error("Missing config file.");
        }

        const yamlContent = fs.readFileSync(configFileName, "utf8");
        const configFile = await Configuration.fromYAML(yamlContent);
        const defaultConfig = Configuration.getDefault();

        return _.merge(
            {},
            defaultConfig,
            Environment.cleanupConfiguration(configFile),
            Environment.cleanupConfiguration(configEnvironment)
        );
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    private static cleanupConfiguration<T extends object>(collection: T): Partial<T> {
        return _.transform(
            collection,
            (memo, val, key) => {
                let shouldEmit = val == null;

                if (!shouldEmit && _.isObject(val)) {
                    val = Environment.cleanupConfiguration(val) as T[keyof T];
                    shouldEmit = val == null;
                }

                if (!shouldEmit) {
                    memo[key] = val;
                } else {
                    delete memo[key];
                }
            }
        );
    }
}

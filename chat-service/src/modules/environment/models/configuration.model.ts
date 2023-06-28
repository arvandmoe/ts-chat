import * as yaml from "js-yaml";
import { AppConfiguration } from "./app-configuration.model";
import { ChatConfiguration } from "./chat-configuration.model";
import { classToPlain, Expose, plainToClass, Type } from "class-transformer";
import { DeepPartial, DeepRequired } from "src/types/utility-types";
import { IsObject, IsOptional, validate, ValidateNested, ValidationError } from "class-validator";
import { JwtConfiguration } from "./jwt-configuration.model";
import _ from "lodash";

export class Configuration {
    @Expose()
    @IsOptional()
    @IsObject()
    @Type(() => AppConfiguration)
    @ValidateNested()
    public app?: AppConfiguration;

    @Expose()
    @IsOptional()
    @IsObject()
    @Type(() => JwtConfiguration)
    @ValidateNested()
    public jwt?: JwtConfiguration;

    @Expose()
    @IsOptional()
    @IsObject()
    @Type(() => ChatConfiguration)
    @ValidateNested()
    public chat?: ChatConfiguration;

    public static async fromYAML(content: string): Promise<Partial<Configuration>> {
        const configFile = yaml.load(content) as unknown;
        const loadedConfigFile = plainToClass(Configuration, configFile, { excludeExtraneousValues: true });

        const validationErrors = await validate(loadedConfigFile);
        if (validationErrors.length > 0) {
            throw Configuration.getValidationError(validationErrors, "Invalid config file provided.");
        }

        return classToPlain(loadedConfigFile);
    }

    public static async fromEnvironment(): Promise<Partial<Configuration>> {
        const loadedConfigFile = plainToClass(
            Configuration,
            {
                app: AppConfiguration.fromEnvironment(),
                jwt: JwtConfiguration.fromEnvironment(),
                chat: ChatConfiguration.fromEnvironment(),
            } as DeepPartial<Configuration>
        );

        const validationErrors = await validate(loadedConfigFile);
        if (validationErrors.length > 0) {
            throw Configuration.getValidationError(validationErrors, "Invalid environment variables provided.");
        }

        return classToPlain(loadedConfigFile);
    }

    public static getDefault(): DeepRequired<Configuration> {
        return {
            app: AppConfiguration.getDefault(),
            jwt: JwtConfiguration.getDefault(),
            chat: ChatConfiguration.getDefault(),
        };
    }

    private static getValidationError(errors: ValidationError[], message: string) {
        if (!errors.length) {
            return;
        }

        errors = _.flatMapDeep(
            errors,
            (e) => !!e.children ? [ e, ...e.children ] : [ e ]
        );

        const errorMessage = errors.map(
            (e) => `-- ${e.property}: "${String(e.value)}" | ${_.toPairs(e.constraints ?? {}).map((p) => `${p[0]} - ${p[1]}`).join(", ") || "Nested"}`
        ).join("\r\n");

        message = message + (!!errorMessage ? `\r\n${errorMessage}` : "");
        return new Error(message);
    }
}

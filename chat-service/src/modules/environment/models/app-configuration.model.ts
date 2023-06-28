import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { TransformNumber } from "../../../common/transformers/transform-number";
import NumberHelper from "../../../common/helpers/number.helper";

export class AppConfiguration {
    @Expose()
    @IsOptional()
    @TransformNumber()
    @IsNumber()
    @Min(1024)
    @Max(65535)
    public port?: number;

    @Expose()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public configFileName?: string;

    public static getDefault(): Required<AppConfiguration> {
        return {
            ...new AppConfiguration(),
            port: 3000,
            configFileName: `config/${process.env.NODE_ENV || "development"}.yml`,
        };
    }

    public static fromEnvironment(): Partial<AppConfiguration> {
        const environment = process.env;
        return {
            port: environment.APP_PORT ? NumberHelper.getAsInteger(environment.APP_PORT) : undefined,
            configFileName: environment.APP_CONFIG_FILE_NAME,
        };
    }
}

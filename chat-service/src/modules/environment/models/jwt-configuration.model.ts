import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { TransformNumber } from "../../../common/transformers/transform-number";
import NumberHelper from "../../../common/helpers/number.helper";

export class JwtConfiguration {
    @Expose()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public issuer?: string;

    @Expose()
    @IsOptional()
    @TransformNumber()
    @IsNumber()
    @Min(60)
    @Max(60 * 60 * 24 * 30)
    public lifetime?: number;

    @Expose()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public secretKey?: string;

    public static getDefault(): Required<JwtConfiguration> {
        return {
            ...new JwtConfiguration(),
            lifetime: 12 * 60 * 60,
            issuer: "example.com",
            secretKey: "SECRET",
        };
    }

    public static fromEnvironment(): Partial<JwtConfiguration> {
        const environment = process.env;
        return {
            issuer: environment.JWT_ISSUER,
            lifetime: environment.JWT_LIFETIME ? NumberHelper.getAsNumber(environment.JWT_LIFETIME) : undefined,
            secretKey: environment.JWT_SECRET_KEY,
        };
    }
}

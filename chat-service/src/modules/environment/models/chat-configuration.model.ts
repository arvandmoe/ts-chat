import { Expose } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";
import { TransformNumber } from "../../../common/transformers/transform-number";
import NumberHelper from "../../../common/helpers/number.helper";

export class ChatConfiguration {
    @Expose()
    @IsOptional()
    @TransformNumber()
    @IsNumber()
    @Min(1)
    @Max(1000)
    public history?: number;

    @Expose()
    @IsOptional()
    @TransformNumber()
    @IsNumber()
    @Min(1)
    @Max(1000)
    public maxMessagePerMinute?: number;

    public static getDefault(): Required<ChatConfiguration> {
        return {
            ...new ChatConfiguration(),
            history: 50,
            maxMessagePerMinute: 10,
        };
    }

    public static fromEnvironment(): Partial<ChatConfiguration> {
        const environment = process.env;
        return {
            history: environment.CHAT_HISTORY ? NumberHelper.getAsInteger(environment.CHAT_HISTORY) : undefined,
            maxMessagePerMinute: environment.CHAT_MAX_MESSAGES_PER_MINUTE ? NumberHelper.getAsInteger(environment.CHAT_MAX_MESSAGES_PER_MINUTE) : undefined,
        };
    }
}

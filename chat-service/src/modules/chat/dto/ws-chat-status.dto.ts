import { Expose, plainToClass } from "class-transformer";

export class WsChatStatusDto {
    @Expose()
    public last_message!: Date | null;

    @Expose()
    public users!: number;

    public static fromInformation(currentMembers: number, lastMessage?: Date): WsChatStatusDto {
        return plainToClass<WsChatStatusDto, Partial<WsChatStatusDto>>(
            WsChatStatusDto,
            {
                last_message: lastMessage ?? null,
                users: currentMembers,
            }
        );
    }
}

import { ChatMessageModel } from "../models/chat-message.model";
import { Expose, plainToClass, Type } from "class-transformer";
import { UserDto } from "../../users/dtos/user.dto";

export class WsChatMessageReplyToDto {
    @Expose()
    public id!: number;

    @Expose()
    public message!: string;

    @Expose()
    @Type(() => UserDto)
    public user!: UserDto | null;

    @Expose()
    public date!: Date;

    public static fromMessage(model: ChatMessageModel): WsChatMessageReplyToDto {
        return plainToClass<WsChatMessageReplyToDto, Partial<WsChatMessageReplyToDto>>(
            WsChatMessageReplyToDto,
            {
                id: model.id,
                message: model.message,
                user: model.user ? UserDto.fromUser(model.user) : null,
                date: model.created,
            }
        );
    }
}

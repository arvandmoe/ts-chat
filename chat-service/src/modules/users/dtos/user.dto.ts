import { ApiProperty } from "@nestjs/swagger";
import { Expose, plainToClass } from "class-transformer";
import { UserModel } from "../models/user.model";
import _ from "lodash";

export class UserDto {
    @ApiProperty(
        {
            description: "The user's identification number",
            type: "integer",
            readOnly: true,
        }
    )
    @Expose()
    public user_id!: number;

    @ApiProperty(
        {
            description: "The user's avatar url",
            type: "string",
            readOnly: true,
        }
    )
    @Expose()
    public user_avatar!: string;

    @ApiProperty(
        {
            description: "The user's username",
            type: "string",
            readOnly: true,
        }
    )
    @Expose()
    public user_name!: string;

    public static fromUser(model: UserModel): UserDto {
        return plainToClass<UserDto, Partial<UserDto>>(
            UserDto,
            {
                user_id: model.userId,
                user_name: model.userName,
                user_avatar: model.userAvatar,
            }
        );
    }
}

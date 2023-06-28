import { ApiProperty } from "@nestjs/swagger";
import { Expose, plainToClass } from "class-transformer";
import { UserDto } from "../../users/dtos/user.dto";
import { UserModel } from "../../users/models/user.model";
import _ from "lodash";

export class MeDto extends UserDto {
    @ApiProperty(
        {
            description: "The user's registration date",
            type: "string",
            format: "date-time",
            readOnly: true,
        }
    )
    @Expose()
    public created!: Date;

    public static fromModel(model: UserModel): MeDto {
        return plainToClass<MeDto, Partial<MeDto>>(
            MeDto,
            {
                ...(UserDto.fromUser(model)),
                created: model.created,
            }
        );
    }
}

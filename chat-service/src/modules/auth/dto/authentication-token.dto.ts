import { ApiProperty } from "@nestjs/swagger";
import { Expose, plainToClass, Type } from "class-transformer";
import { MeDto } from "./me.dto";
import { UserModel } from "../../users/models/user.model";

export class AuthenticationTokenDto {
    @ApiProperty(
        {
            description: "The user's information",
            type: MeDto,
            readOnly: true,
        }
    )
    @Expose()
    @Type(() => MeDto)
    public user!: MeDto;

    @ApiProperty(
        {
            description: "Contains the JWT token",
            type: "string",
            readOnly: true,
        }
    )
    @Expose()
    public token!: string;

    public static fromModel(model: UserModel, token: string): AuthenticationTokenDto {
        return plainToClass<AuthenticationTokenDto, Partial<AuthenticationTokenDto>>(
            AuthenticationTokenDto,
            {
                user: MeDto.fromModel(model),
                token,
            }
        );
    }
}

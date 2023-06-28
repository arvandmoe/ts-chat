import { ApiProperty } from "@nestjs/swagger";
import { Constants } from "../../../common/constants";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class RegisterDto {
    @ApiProperty(
        {
            description: "The user's choosen user name",
            type: "string",
            required: true,
            writeOnly: true,
        }
    )
    @Expose()
    @IsString()
    @IsNotEmpty()
    @Matches(Constants.UsernameRegex)
    @Length(4, 16)
    public user_name!: string;
}

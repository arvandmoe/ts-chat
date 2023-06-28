import { Expose, plainToClass } from "class-transformer";
import { MutedUserModel } from "../models/muted-user.model";
import { UserDto } from "../../users/dtos/user.dto";

export class WsChatUserMutedDto extends UserDto {
    @Expose()
    public muted!: Date;

    public static fromMutedUser(model: MutedUserModel): WsChatUserMutedDto {
        return plainToClass<WsChatUserMutedDto, Partial<WsChatUserMutedDto>>(
            WsChatUserMutedDto,
            {
                ...(UserDto.fromUser(model.mutedUser)),
                muted: model.created,
            }
        );
    }

    public static fromMutedUsers(models: MutedUserModel[]): WsChatUserMutedDto[] {
        return models.map((m) => this.fromMutedUser(m));
    }
}

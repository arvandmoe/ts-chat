import { MutedUserModel } from "../models/muted-user.model";
import { UserDto } from "../../users/dtos/user.dto";
export declare class WsChatUserMutedDto extends UserDto {
    muted: Date;
    static fromMutedUser(model: MutedUserModel): WsChatUserMutedDto;
    static fromMutedUsers(models: MutedUserModel[]): WsChatUserMutedDto[];
}

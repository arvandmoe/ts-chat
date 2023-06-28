import { UserModel } from "../../users/models/user.model";
export interface MutedUserModel {
    userId: number;
    mutedUser: UserModel;
    created: Date;
}

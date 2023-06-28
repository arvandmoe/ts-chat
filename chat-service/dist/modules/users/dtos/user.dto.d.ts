import { UserModel } from "../models/user.model";
export declare class UserDto {
    user_id: number;
    user_avatar: string;
    user_name: string;
    static fromUser(model: UserModel): UserDto;
}

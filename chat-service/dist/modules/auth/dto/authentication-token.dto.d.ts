import { MeDto } from "./me.dto";
import { UserModel } from "../../users/models/user.model";
export declare class AuthenticationTokenDto {
    user: MeDto;
    token: string;
    static fromModel(model: UserModel, token: string): AuthenticationTokenDto;
}

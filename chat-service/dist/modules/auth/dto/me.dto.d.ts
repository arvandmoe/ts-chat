import { UserDto } from "../../users/dtos/user.dto";
import { UserModel } from "../../users/models/user.model";
export declare class MeDto extends UserDto {
    created: Date;
    static fromModel(model: UserModel): MeDto;
}

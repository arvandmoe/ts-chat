import { UserModel } from "./models/user.model";
export declare class UsersService {
    private readonly logger;
    private readonly usersRepository;
    private maxUserId;
    getUser(userId: number): UserModel | undefined;
    registerUser(userName: string): UserModel;
}

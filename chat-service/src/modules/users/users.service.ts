import { ExtendedLogger } from "../../common/extended-logger";
import { Injectable } from "@nestjs/common";
import { UserModel } from "./models/user.model";

@Injectable()
export class UsersService {
    private readonly logger = new ExtendedLogger("user-service");
    private readonly usersRepository = new Map<number, UserModel>();
    private maxUserId = 0;

    public getUser(userId: number): UserModel | undefined {
        return this.usersRepository.get(userId);
    }

    public registerUser(userName: string): UserModel {
        try {
            const userId = (++this.maxUserId);
            const user: UserModel = {
                userId,
                userName,
                userAvatar: `https://i.pravatar.cc/150?img=${userId}`,
                created: new Date(),
            };

            this.usersRepository.set(userId, user);

            return user;
        } catch (error) {
            this.logger.errorEx(
                {
                    message: "Failed to register a new user",
                    exception: error,
                    meta: { userName },
                }
            );

            throw error;
        }
    }
}

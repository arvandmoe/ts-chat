import { UserModel } from "../../users/models/user.model";

export interface ChatMessageModel {
    id: number;
    replyTo: ChatMessageModel | null;
    user: UserModel | null;
    message: string;
    created: Date;
}

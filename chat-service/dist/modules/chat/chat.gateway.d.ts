import { ChatService } from "./chat.service";
import { OnGatewayConnection } from "@nestjs/websockets";
import { Server } from "socket.io";
import { SocketClient } from "../../common/interfaces/socket-client.interface";
import { UserModel } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
import { WsChatJoinDto } from "./dto/ws-chat-join.dto";
import { WsChatMessageSendDto } from "./dto/ws-chat-message-send.dto";
import { WsChatUserMuteDto } from "./dto/ws-chat-user-mute.dto";
export declare class ChatGateway implements OnGatewayConnection {
    private readonly usersService;
    private readonly chatService;
    private server;
    private readonly logger;
    private connectedSockets;
    private lastSystemMessage;
    constructor(usersService: UsersService, chatService: ChatService);
    notifyStatus(): void;
    sendSystemMessage(): void;
    onJoined(socket: SocketClient<UserModel>, dto: WsChatJoinDto): void;
    onSendMessage(socket: SocketClient<UserModel>, dto: WsChatMessageSendDto): void;
    onMuteUser(socket: SocketClient<UserModel>, dto: WsChatUserMuteDto): void;
    handleConnection(socket: SocketClient<UserModel>, ..._args: unknown[]): void;
    handleDisconnect(_socket: SocketClient): void;
    afterInit(_server: Server): void;
}

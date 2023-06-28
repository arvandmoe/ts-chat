import { AuthModule } from "../auth/auth.module";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { EnvironmentModule } from "../environment/environment.module";
import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";

@Module(
    {
        imports: [
            EnvironmentModule,
            UsersModule,
            AuthModule,
        ],
        providers: [ ChatService, ChatGateway ],
        controllers: [ ],
        exports: [ ChatService ],
    }
)
export class ChatModule {}

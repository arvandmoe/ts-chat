import { AuthModule } from "./modules/auth/auth.module";
import { ChatModule } from "./modules/chat/chat.module";
import { EnvironmentModule } from "./modules/environment/environment.module";
import { ExtendedLogger } from "./common/extended-logger";
import { ExtendedRequestContext } from "./common/models/extended-request-context.model";
import { HealthModule } from "./modules/health/health.module";
import { Module } from "@nestjs/common";
import { RequestContextModule } from "@medibloc/nestjs-request-context";
import { ScheduleModule } from "@nestjs/schedule";
import { UsersModule } from "./modules/users/users.module";

@Module(
    {
        imports: [
            EnvironmentModule,
            RequestContextModule.forRoot(
                {
                    contextClass: ExtendedRequestContext,
                    isGlobal: true,
                }
            ),
            ScheduleModule.forRoot(),
            HealthModule,
            AuthModule,
            UsersModule,
            ChatModule,
        ],
        providers: [ ExtendedLogger ],
    }
)
export class AppModule { }

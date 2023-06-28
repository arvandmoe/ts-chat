import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Constants } from "../../common/constants";
import { Environment } from "../environment/environment";
import { EnvironmentModule } from "../environment/environment.module";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";

@Module(
    {
        imports: [
            EnvironmentModule,
            JwtModule.registerAsync(
                {
                    useFactory: (env: Environment) => (
                        {
                            verifyOptions: {
                                algorithms: [ "HS256" ],
                                ignoreExpiration: false,
                            },
                            secret: env.config.jwt.secretKey,
                            signOptions: {
                                expiresIn: env.config.jwt.lifetime,
                                issuer: env.config.jwt.issuer,
                            },
                        }
                    ),
                    imports: [ EnvironmentModule ],
                    inject: [ Environment ],
                }
            ),
            UsersModule,
        ],
        controllers: [ AuthController ],
        providers: [
            AuthService,
            {
                provide: Constants.RequestAuthenticatorProvider,
                useExisting: AuthService,
            },
        ],
        exports: [ AuthService, Constants.RequestAuthenticatorProvider ],
    }
)
export class AuthModule {}

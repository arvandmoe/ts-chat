import { Environment } from "./environment";
import { Global, Module } from "@nestjs/common";

@Global()
@Module(
    {
        providers: [
            {
                provide: Environment,
                useFactory: () => Environment.getSnapshot(),
            },
        ],
        exports: [ Environment ],
    }
)
export class EnvironmentModule {}

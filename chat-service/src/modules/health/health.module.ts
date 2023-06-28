import { HealthController } from "./health.controller";
import { Module } from "@nestjs/common";

@Module(
    {
        imports: [],
        controllers: [ HealthController ],
        providers: [],
        exports: [],
    }
)
export class HealthModule {}

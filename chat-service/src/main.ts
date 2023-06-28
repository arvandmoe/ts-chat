import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Environment } from "./modules/environment/environment";
import { ExtendedLogger } from "./common/extended-logger";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import { xssFilter } from "helmet";

const main = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const env = app.get(Environment);

    if (env.isInDevelopment) {
        const options = new DocumentBuilder()
            .setTitle("chat-service")
            .setDescription("The Chat Service")
            .setVersion("1.0")
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup("swagger", app, document);
    }

    app.use(xssFilter());
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));

    await app.listen(env.config.app.port);

    const logger: Logger = new ExtendedLogger("app");
    app.useLogger(logger);
    logger.log(`Chat service is listening on port ${env.config.app.port}...`);
};

void main();

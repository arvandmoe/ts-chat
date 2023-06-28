"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const environment_1 = require("./modules/environment/environment");
const extended_logger_1 = require("./common/extended-logger");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const helmet_1 = require("helmet");
const main = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const env = app.get(environment_1.Environment);
    if (env.isInDevelopment) {
        const options = new swagger_1.DocumentBuilder()
            .setTitle("chat-service")
            .setDescription("The Chat Service")
            .setVersion("1.0")
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup("swagger", app, document);
    }
    app.use(helmet_1.xssFilter());
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, forbidUnknownValues: true }));
    await app.listen(env.config.app.port);
    const logger = new extended_logger_1.ExtendedLogger("app");
    app.useLogger(logger);
    logger.log(`Chat service is listening on port ${env.config.app.port}...`);
};
void main();
//# sourceMappingURL=main.js.map
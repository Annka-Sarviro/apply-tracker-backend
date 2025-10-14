import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix("api");
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Job Tracker API")
    .setDescription("Example of Job Tracker API routes")
    .setVersion("1.0")
    .addTag("Job Tracker API")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        name: "Authorization",
        description: "Enter your JWT token",
        in: "header",
      },
      "access-token"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/swagger", app, document);

  await app.init();
  return server;
}

export default bootstrap();

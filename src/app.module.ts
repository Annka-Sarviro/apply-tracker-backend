import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailerModule } from "@nestjs-modules/mailer";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { join } from "path";

// === Твої модулі ===
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MailingModule } from "./mailing/mailing.module";
import { VacanciesModule } from "./vacancies/vacancies.module";
import { VacancyStatusModule } from "./vacancy-status/vacancy-status.module";
import { ResumeModule } from "./resume/resume.module";
import { ProjectsModule } from "./projects/projects.module";
import { CoverLetterModule } from "./cover-letter/cover-letter.module";
import { NotesModule } from "./notes/notes.module";
import { EventsModule } from "./events/events.module";
import { PredictionsModule } from "./predictions/predictions.module";

// === Middleware ===
import { MalformedUrlMiddleware } from "./common/middleware/malformed-url.middleware";

// ====  healthcheck Controller====
import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthController {
  @Get("health")
  health() {
    return { status: "ok", timestamp: new Date().toISOString() };
  }
}

@Module({
  imports: [
    // --- 1. ConfigModule (глобальний .env) ---
    ConfigModule.forRoot({ isGlobal: true }),

    // --- 2. TypeORM ---
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get("DATABASE_URL"),
        entities: [__dirname + "/**/*.entity{.js,.ts}"],
        synchronize: process.env.NODE_ENV !== "production",
        logging: process.env.NODE_ENV !== "production",
      }),
      inject: [ConfigService],
    }),

    // --- 3. Mailer ---
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>("SMTP_HOST"),
          port: configService.get<number>("SMTP_PORT"),
          secure: true,
          auth: {
            user: configService.get<string>("SMTP_USER"),
            pass: configService.get<string>("SMTP_PASSWORD"),
          },
        },
        defaults: {
          from: configService.get<string>("SMTP_FROM"),
        },
        template: {
          dir: join(process.cwd(), "templates"),
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          viewEngine: {
            engine: "ejs",
            templates: join(process.cwd(), "templates"),
          },
        },
      }),
      inject: [ConfigService],
    }),

    // --- 4. App modules ---
    UserModule,
    AuthModule,
    MailingModule,
    VacanciesModule,
    VacancyStatusModule,
    ResumeModule,
    ProjectsModule,
    CoverLetterModule,
    NotesModule,
    EventsModule,
    PredictionsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MalformedUrlMiddleware)
      .exclude(
        { path: "auth/(.*)", method: RequestMethod.ALL },
        { path: "mailing/(.*)", method: RequestMethod.ALL }
      )
      .forRoutes("*");
  }
}

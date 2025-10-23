import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { AuthModule } from "../auth/auth.module";
import { SupportsService } from "./supports.service";
import { SupportsController } from "./supports.controller";
import { Support } from "./entities/support.entity";
import { MailingModule } from "src/mailing/mailing.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Support]),
    AuthModule,
    MailingModule,
  ],
  controllers: [SupportsController],
  providers: [SupportsService],
  exports: [SupportsService],
})
export class SupportsModule {}

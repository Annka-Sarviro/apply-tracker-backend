import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1735000000000 implements MigrationInterface {
  name = "InitSchema1735000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."VacancyStatus_name_enum" AS ENUM('saved', 'resume', 'hr', 'test', 'tech', 'reject', 'offer')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."VacancyStatus_rejectreason_enum" AS ENUM('SOFT_SKILLS', 'TECH_SKILLS', 'ENGLISH', 'EXPERIENCE', 'STOPPED', 'NO_ANSWER', 'OTHER')`
    );
    await queryRunner.query(
      `CREATE TABLE "VacancyStatus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."VacancyStatus_name_enum" NOT NULL DEFAULT 'saved', "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rejectReason" "public"."VacancyStatus_rejectreason_enum", "resumeId" character varying, "vacancyId" uuid, CONSTRAINT "PK_2c59cad9e1a602400232d42d0f5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."Vacancies_work_type_enum" AS ENUM('remote', 'office', 'hybrid')`
    );
    await queryRunner.query(
      `CREATE TABLE "Vacancies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vacancy" character varying NOT NULL, "link" character varying NOT NULL, "communication" character varying, "company" character varying NOT NULL, "location" character varying NOT NULL, "work_type" "public"."Vacancies_work_type_enum" NOT NULL, "note" text, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_b8ff68d9b5d54e406638a1caa31" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "Resume" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "link" character varying NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_436c1a0b41bee56e27fd7c1b3a1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "Projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "technologies" character varying, "description" text, "link" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_b25c37f2cdf0161b4f10ed3121c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "Note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "text" text, "userId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a677a8365a6131301c9c01254e9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "Event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "text" text, "date" date NOT NULL, "time" TIME NOT NULL, "userId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_894abf6d0c8562b398c717414d6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "Predictions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "textUk" text NOT NULL, "textEn" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_bb41e26c3f44caa5243d0023ffa" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "User" ("id" uuid NOT NULL, "username" character varying, "email" character varying NOT NULL, "phone" character varying, "socials" json, "password" character varying, "resetToken" character varying, "resetTokenExpiry" TIMESTAMP WITH TIME ZONE, "invalidatedTokens" text, "googleId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "CoverLetters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "text" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_ca911771847f05aff9aa372bb77" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "PredictionHistory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shownAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "predictionId" uuid, CONSTRAINT "PK_13942931c90d63dacee405308eb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "VacancyStatus" ADD CONSTRAINT "FK_75dc7c62decd4a39af8332c1bd8" FOREIGN KEY ("vacancyId") REFERENCES "Vacancies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Vacancies" ADD CONSTRAINT "FK_1c346ad58075422784445ea555a" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Resume" ADD CONSTRAINT "FK_7c78c01be0fcf535cf876cd5240" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Projects" ADD CONSTRAINT "FK_828856727aa053c3e37f698caa9" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Note" ADD CONSTRAINT "FK_a4dbe3b4fb54de53b2ad39f6554" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Event" ADD CONSTRAINT "FK_df4217bb197f7673ebb368ea6e8" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Predictions" ADD CONSTRAINT "FK_637a25e6a8f28895e411f48a014" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "CoverLetters" ADD CONSTRAINT "FK_48d4df71982de47e74b7c04ed61" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "PredictionHistory" ADD CONSTRAINT "FK_e697fefc8537bd9cfe0b6be62cf" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "PredictionHistory" ADD CONSTRAINT "FK_6fb2339545967a9729f57dfd544" FOREIGN KEY ("predictionId") REFERENCES "Predictions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "PredictionHistory" DROP CONSTRAINT "FK_6fb2339545967a9729f57dfd544"`
    );
    await queryRunner.query(
      `ALTER TABLE "PredictionHistory" DROP CONSTRAINT "FK_e697fefc8537bd9cfe0b6be62cf"`
    );
    await queryRunner.query(
      `ALTER TABLE "CoverLetters" DROP CONSTRAINT "FK_48d4df71982de47e74b7c04ed61"`
    );
    await queryRunner.query(
      `ALTER TABLE "Predictions" DROP CONSTRAINT "FK_637a25e6a8f28895e411f48a014"`
    );
    await queryRunner.query(
      `ALTER TABLE "Event" DROP CONSTRAINT "FK_df4217bb197f7673ebb368ea6e8"`
    );
    await queryRunner.query(
      `ALTER TABLE "Note" DROP CONSTRAINT "FK_a4dbe3b4fb54de53b2ad39f6554"`
    );
    await queryRunner.query(
      `ALTER TABLE "Projects" DROP CONSTRAINT "FK_828856727aa053c3e37f698caa9"`
    );
    await queryRunner.query(
      `ALTER TABLE "Resume" DROP CONSTRAINT "FK_7c78c01be0fcf535cf876cd5240"`
    );
    await queryRunner.query(
      `ALTER TABLE "Vacancies" DROP CONSTRAINT "FK_1c346ad58075422784445ea555a"`
    );
    await queryRunner.query(
      `ALTER TABLE "VacancyStatus" DROP CONSTRAINT "FK_75dc7c62decd4a39af8332c1bd8"`
    );
    await queryRunner.query(`DROP TABLE "PredictionHistory"`);
    await queryRunner.query(`DROP TABLE "CoverLetters"`);
    await queryRunner.query(`DROP TABLE "User"`);
    await queryRunner.query(`DROP TABLE "Predictions"`);
    await queryRunner.query(`DROP TABLE "Event"`);
    await queryRunner.query(`DROP TABLE "Note"`);
    await queryRunner.query(`DROP TABLE "Projects"`);
    await queryRunner.query(`DROP TABLE "Resume"`);
    await queryRunner.query(`DROP TABLE "Vacancies"`);
    await queryRunner.query(`DROP TYPE "public"."Vacancies_work_type_enum"`);
    await queryRunner.query(`DROP TABLE "VacancyStatus"`);
    await queryRunner.query(
      `DROP TYPE "public"."VacancyStatus_rejectreason_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."VacancyStatus_name_enum"`);
  }
}

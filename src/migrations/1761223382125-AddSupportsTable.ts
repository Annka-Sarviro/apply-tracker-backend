import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1761223382125 implements MigrationInterface {
    name = 'AutoMigration1761223382125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "text" text, "userId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d8c2a7cbebc6494f00dda770105" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "supports" ADD CONSTRAINT "FK_d191a591c0be160e45bcd27bd88" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supports" DROP CONSTRAINT "FK_d191a591c0be160e45bcd27bd88"`);
        await queryRunner.query(`DROP TABLE "supports"`);
    }

}

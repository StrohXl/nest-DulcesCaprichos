import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1698963473263 implements MigrationInterface {
    name = 'Name1698963473263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name_ingredient" character varying(100) NOT NULL, "price" integer NOT NULL, "stoke" integer NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_eeb5b60ca6e29970635b3a5cb4a" UNIQUE ("name_ingredient"), CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ingredient"`);
    }

}

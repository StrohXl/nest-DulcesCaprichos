import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1700081869779 implements MigrationInterface {
    name = 'Name1700081869779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" RENAME COLUMN "stock" TO "description"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "description" character varying(200) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "description" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ingredient" RENAME COLUMN "description" TO "stock"`);
    }

}

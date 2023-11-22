import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1698965478071 implements MigrationInterface {
    name = 'Name1698965478071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" RENAME COLUMN "stoke" TO "stock"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" RENAME COLUMN "stock" TO "stoke"`);
    }

}

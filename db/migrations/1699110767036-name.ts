import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1699110767036 implements MigrationInterface {
    name = 'Name1699110767036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "update_at" TO "update_a"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "update_a" TO "update_at"`);
    }

}

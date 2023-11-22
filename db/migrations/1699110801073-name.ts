import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1699110801073 implements MigrationInterface {
    name = 'Name1699110801073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "update_a" TO "update_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "update_at" TO "update_a"`);
    }

}

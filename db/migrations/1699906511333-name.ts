import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1699906511333 implements MigrationInterface {
    name = 'Name1699906511333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud_de_compra" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud_de_compra" DROP COLUMN "price"`);
    }

}

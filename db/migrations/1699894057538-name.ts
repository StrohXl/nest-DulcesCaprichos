import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1699894057538 implements MigrationInterface {
    name = 'Name1699894057538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud" DROP CONSTRAINT "FK_343153d2c43fb1349286df856da"`);
        await queryRunner.query(`ALTER TABLE "solicitud" RENAME COLUMN "solicitudDeCompraId" TO "solicitud_de_compra"`);
        await queryRunner.query(`ALTER TABLE "solicitud" ADD CONSTRAINT "FK_1ba51002f9743098eb51c9d7b12" FOREIGN KEY ("solicitud_de_compra") REFERENCES "solicitud_de_compra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud" DROP CONSTRAINT "FK_1ba51002f9743098eb51c9d7b12"`);
        await queryRunner.query(`ALTER TABLE "solicitud" RENAME COLUMN "solicitud_de_compra" TO "solicitudDeCompraId"`);
        await queryRunner.query(`ALTER TABLE "solicitud" ADD CONSTRAINT "FK_343153d2c43fb1349286df856da" FOREIGN KEY ("solicitudDeCompraId") REFERENCES "solicitud_de_compra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

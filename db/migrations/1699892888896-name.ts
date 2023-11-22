import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1699892888896 implements MigrationInterface {
    name = 'Name1699892888896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "solicitud_de_compra" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_c17e069c85982c86b1de7b548b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "solicitud" ADD "price" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "solicitud" ADD "solicitudDeCompraId" integer`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_compra" ADD CONSTRAINT "FK_d32ebb9ca80c46764f47036f280" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitud" ADD CONSTRAINT "FK_343153d2c43fb1349286df856da" FOREIGN KEY ("solicitudDeCompraId") REFERENCES "solicitud_de_compra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud" DROP CONSTRAINT "FK_343153d2c43fb1349286df856da"`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_compra" DROP CONSTRAINT "FK_d32ebb9ca80c46764f47036f280"`);
        await queryRunner.query(`ALTER TABLE "solicitud" DROP COLUMN "solicitudDeCompraId"`);
        await queryRunner.query(`ALTER TABLE "solicitud" DROP COLUMN "price"`);
        await queryRunner.query(`DROP TABLE "solicitud_de_compra"`);
    }

}

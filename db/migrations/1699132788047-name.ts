import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1699132788047 implements MigrationInterface {
    name = 'Name1699132788047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient_usage" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient_usage" ADD CONSTRAINT "FK_cbddbf83af44fdcc2aa4473218b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient_usage" DROP CONSTRAINT "FK_cbddbf83af44fdcc2aa4473218b"`);
        await queryRunner.query(`ALTER TABLE "ingredient_usage" DROP COLUMN "productId"`);
    }

}

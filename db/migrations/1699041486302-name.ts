import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1699041486302 implements MigrationInterface {
    name = 'Name1699041486302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "stock" integer NOT NULL, "price" integer NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_ingredients_ingredient" ("productId" integer NOT NULL, "ingredientId" integer NOT NULL, CONSTRAINT "PK_5ef80d7e1f18da1a12043082894" PRIMARY KEY ("productId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d12a293c29f0482f00f1f2f538" ON "product_ingredients_ingredient" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9c2894b25a66c9533f22de9a06" ON "product_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`ALTER TABLE "product_ingredients_ingredient" ADD CONSTRAINT "FK_d12a293c29f0482f00f1f2f538b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_ingredients_ingredient" ADD CONSTRAINT "FK_9c2894b25a66c9533f22de9a06e" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_ingredients_ingredient" DROP CONSTRAINT "FK_9c2894b25a66c9533f22de9a06e"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients_ingredient" DROP CONSTRAINT "FK_d12a293c29f0482f00f1f2f538b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c2894b25a66c9533f22de9a06"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d12a293c29f0482f00f1f2f538"`);
        await queryRunner.query(`DROP TABLE "product_ingredients_ingredient"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1699117140344 implements MigrationInterface {
    name = 'Name1699117140344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name_ingredient" character varying(100) NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_eeb5b60ca6e29970635b3a5cb4a" UNIQUE ("name_ingredient"), CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "stock" integer NOT NULL, "price" integer NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "receta" ("id" SERIAL NOT NULL, "quantityIngredients" integer NOT NULL, "productId" integer, CONSTRAINT "REL_28f0b430be252d30bb473e26f5" UNIQUE ("productId"), CONSTRAINT "PK_f3acd9397b95e92dd92c8b089ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "receta_ingredients_ingredient" ("recetaId" integer NOT NULL, "ingredientId" integer NOT NULL, CONSTRAINT "PK_2651a1f7fa6801692db7a5ad1ff" PRIMARY KEY ("recetaId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_316939c7c9f9e38a2925ac4fb2" ON "receta_ingredients_ingredient" ("recetaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c1d1741cfb45c825d44e86742" ON "receta_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`ALTER TABLE "receta" ADD CONSTRAINT "FK_28f0b430be252d30bb473e26f5d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receta_ingredients_ingredient" ADD CONSTRAINT "FK_316939c7c9f9e38a2925ac4fb28" FOREIGN KEY ("recetaId") REFERENCES "receta"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "receta_ingredients_ingredient" ADD CONSTRAINT "FK_3c1d1741cfb45c825d44e867422" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receta_ingredients_ingredient" DROP CONSTRAINT "FK_3c1d1741cfb45c825d44e867422"`);
        await queryRunner.query(`ALTER TABLE "receta_ingredients_ingredient" DROP CONSTRAINT "FK_316939c7c9f9e38a2925ac4fb28"`);
        await queryRunner.query(`ALTER TABLE "receta" DROP CONSTRAINT "FK_28f0b430be252d30bb473e26f5d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c1d1741cfb45c825d44e86742"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_316939c7c9f9e38a2925ac4fb2"`);
        await queryRunner.query(`DROP TABLE "receta_ingredients_ingredient"`);
        await queryRunner.query(`DROP TABLE "receta"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
    }

}

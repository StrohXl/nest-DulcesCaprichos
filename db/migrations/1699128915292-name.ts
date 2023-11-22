import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1699128915292 implements MigrationInterface {
    name = 'Name1699128915292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" RENAME COLUMN "name_ingredient" TO "name"`);
        await queryRunner.query(`ALTER TABLE "ingredient" RENAME CONSTRAINT "UQ_eeb5b60ca6e29970635b3a5cb4a" TO "UQ_b6802ac7fbd37aa71d856a95d8f"`);
        await queryRunner.query(`CREATE TABLE "ingredient_usage" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "ingredientId" integer, CONSTRAINT "PK_81d32517f50a78d434aa0826271" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "money" integer NOT NULL DEFAULT '1000'`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "stock" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ingredient_usage" ADD CONSTRAINT "FK_1f3842625d1fdd503a697ff1c7c" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient_usage" DROP CONSTRAINT "FK_1f3842625d1fdd503a697ff1c7c"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "stock" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "money"`);
        await queryRunner.query(`DROP TABLE "ingredient_usage"`);
        await queryRunner.query(`ALTER TABLE "ingredient" RENAME CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f" TO "UQ_eeb5b60ca6e29970635b3a5cb4a"`);
        await queryRunner.query(`ALTER TABLE "ingredient" RENAME COLUMN "name" TO "name_ingredient"`);
    }

}

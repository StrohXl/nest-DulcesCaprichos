import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1701963639129 implements MigrationInterface {
    name = 'Name1701963639129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "confirm_user" ("id" SERIAL NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "token" character varying(10) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_0576da02d3f6418d373b079a627" UNIQUE ("email"), CONSTRAINT "PK_2e74f7f6d17713850a37e68ba19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "stock" integer NOT NULL, "price" integer NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "money" integer NOT NULL DEFAULT '1000', "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solicitud_de_compra" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_c17e069c85982c86b1de7b548b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solicitud" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL DEFAULT '0', "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "solicitud_de_compra" integer, "id_ingredient" integer, CONSTRAINT "PK_511b9da509891c4d75633b5079c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(200) NOT NULL DEFAULT '', "price" integer NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient_usage" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "ingredientId" integer, "productId" integer, CONSTRAINT "PK_81d32517f50a78d434aa0826271" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_compra" ADD CONSTRAINT "FK_d32ebb9ca80c46764f47036f280" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitud" ADD CONSTRAINT "FK_1ba51002f9743098eb51c9d7b12" FOREIGN KEY ("solicitud_de_compra") REFERENCES "solicitud_de_compra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitud" ADD CONSTRAINT "FK_db9eac5ae4bffa457697188f379" FOREIGN KEY ("id_ingredient") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_d621784b59b05016938180fb3bb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient_usage" ADD CONSTRAINT "FK_1f3842625d1fdd503a697ff1c7c" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient_usage" ADD CONSTRAINT "FK_cbddbf83af44fdcc2aa4473218b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient_usage" DROP CONSTRAINT "FK_cbddbf83af44fdcc2aa4473218b"`);
        await queryRunner.query(`ALTER TABLE "ingredient_usage" DROP CONSTRAINT "FK_1f3842625d1fdd503a697ff1c7c"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_d621784b59b05016938180fb3bb"`);
        await queryRunner.query(`ALTER TABLE "solicitud" DROP CONSTRAINT "FK_db9eac5ae4bffa457697188f379"`);
        await queryRunner.query(`ALTER TABLE "solicitud" DROP CONSTRAINT "FK_1ba51002f9743098eb51c9d7b12"`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_compra" DROP CONSTRAINT "FK_d32ebb9ca80c46764f47036f280"`);
        await queryRunner.query(`DROP TABLE "ingredient_usage"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "solicitud"`);
        await queryRunner.query(`DROP TABLE "solicitud_de_compra"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "confirm_user"`);
    }

}

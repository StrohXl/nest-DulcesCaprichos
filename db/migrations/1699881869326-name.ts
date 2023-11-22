import { MigrationInterface, QueryRunner } from "typeorm";

export class Name1699881869326 implements MigrationInterface {
    name = 'Name1699881869326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "solicitud" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_ingredient" integer, CONSTRAINT "PK_511b9da509891c4d75633b5079c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "solicitud" ADD CONSTRAINT "FK_db9eac5ae4bffa457697188f379" FOREIGN KEY ("id_ingredient") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud" DROP CONSTRAINT "FK_db9eac5ae4bffa457697188f379"`);
        await queryRunner.query(`DROP TABLE "solicitud"`);
    }

}

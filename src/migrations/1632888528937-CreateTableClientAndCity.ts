import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableClientAndCity1632888528937 implements MigrationInterface {
    name = 'CreateTableClientAndCity1632888528937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "client" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "gender" varchar NOT NULL, "birth_date" date NOT NULL, "age" integer NOT NULL, "city_id" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_client" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "gender" varchar NOT NULL, "birth_date" date NOT NULL, "age" integer NOT NULL, "city_id" integer, CONSTRAINT "FK_bdbf3fd4c38d2b874572ac5acb4" FOREIGN KEY ("city_id") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_client"("id", "name", "gender", "birth_date", "age", "city_id") SELECT "id", "name", "gender", "birth_date", "age", "city_id" FROM "client"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`ALTER TABLE "temporary_client" RENAME TO "client"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" RENAME TO "temporary_client"`);
        await queryRunner.query(`CREATE TABLE "client" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "gender" varchar NOT NULL, "birth_date" date NOT NULL, "age" integer NOT NULL, "city_id" integer)`);
        await queryRunner.query(`INSERT INTO "client"("id", "name", "gender", "birth_date", "age", "city_id") SELECT "id", "name", "gender", "birth_date", "age", "city_id" FROM "temporary_client"`);
        await queryRunner.query(`DROP TABLE "temporary_client"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "city"`);
    }

}

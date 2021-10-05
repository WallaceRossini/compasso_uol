import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTableCity1632890456097 implements MigrationInterface {
    name = 'UpdateTableCity1632890456097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_city" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "state" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_city"("id", "name") SELECT "id", "name" FROM "city"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`ALTER TABLE "temporary_city" RENAME TO "city"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" RENAME TO "temporary_city"`);
        await queryRunner.query(`CREATE TABLE "city" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "city"("id", "name") SELECT "id", "name" FROM "temporary_city"`);
        await queryRunner.query(`DROP TABLE "temporary_city"`);
    }

}

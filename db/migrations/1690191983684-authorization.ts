import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1690191983684 implements MigrationInterface {
    name = 'Authorization1690191983684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_project\` DROP FOREIGN KEY \`FK_2a9fa09f8ba78a7b9b317a72bac\``);
        await queryRunner.query(`DROP INDEX \`REL_2a9fa09f8ba78a7b9b317a72ba\` ON \`user_project\``);
        await queryRunner.query(`ALTER TABLE \`user_project\` DROP COLUMN \`timesheetId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_project\` ADD \`timesheetId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_2a9fa09f8ba78a7b9b317a72ba\` ON \`user_project\` (\`timesheetId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_project\` ADD CONSTRAINT \`FK_2a9fa09f8ba78a7b9b317a72bac\` FOREIGN KEY (\`timesheetId\`) REFERENCES \`timesheet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

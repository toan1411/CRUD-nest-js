import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1690069620470 implements MigrationInterface {
    name = 'Authorization1690069620470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP FOREIGN KEY \`FK_ac58894ff3ba9e26707b7528ecd\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` CHANGE \`projectId\` \`userProject\` int NULL`);
        await queryRunner.query(`CREATE TABLE \`user_project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`timesheetId\` int NULL, UNIQUE INDEX \`REL_2a9fa09f8ba78a7b9b317a72ba\` (\`timesheetId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userProjectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`userProjectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP COLUMN \`userProject\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD \`userProject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_0b155d816f53ae5685adc0514b0\` FOREIGN KEY (\`userProjectId\`) REFERENCES \`user_project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_project\` ADD CONSTRAINT \`FK_2a9fa09f8ba78a7b9b317a72bac\` FOREIGN KEY (\`timesheetId\`) REFERENCES \`user_project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_44c3ec718128f38dc4d82e5c02d\` FOREIGN KEY (\`userProjectId\`) REFERENCES \`user_project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_44c3ec718128f38dc4d82e5c02d\``);
        await queryRunner.query(`ALTER TABLE \`user_project\` DROP FOREIGN KEY \`FK_2a9fa09f8ba78a7b9b317a72bac\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_0b155d816f53ae5685adc0514b0\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP COLUMN \`userProject\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD \`userProject\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`userProjectId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userProjectId\``);
        await queryRunner.query(`DROP INDEX \`REL_2a9fa09f8ba78a7b9b317a72ba\` ON \`user_project\``);
        await queryRunner.query(`DROP TABLE \`user_project\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` CHANGE \`userProject\` \`projectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD CONSTRAINT \`FK_ac58894ff3ba9e26707b7528ecd\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

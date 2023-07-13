import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1689219598990 implements MigrationInterface {
    name = 'Authorization1689219598990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_f7872fc2ad142e3aef1077fb171\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`timesheetsId\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD \`projectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD CONSTRAINT \`FK_ac58894ff3ba9e26707b7528ecd\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP FOREIGN KEY \`FK_ac58894ff3ba9e26707b7528ecd\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP COLUMN \`projectId\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`timesheetsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_f7872fc2ad142e3aef1077fb171\` FOREIGN KEY (\`timesheetsId\`) REFERENCES \`timesheet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

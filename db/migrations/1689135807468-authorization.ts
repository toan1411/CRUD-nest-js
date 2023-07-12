import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1689135807468 implements MigrationInterface {
    name = 'Authorization1689135807468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`jobTitble\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD \`status\` set ('new', 'pending', 'approved') NOT NULL DEFAULT 'new'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`jobTitble\` varchar(255) NOT NULL`);
    }

}

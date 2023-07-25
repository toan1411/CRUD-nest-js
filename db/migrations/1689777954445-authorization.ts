import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1689777954445 implements MigrationInterface {
    name = 'Authorization1689777954445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD \`date\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD \`date\` datetime NOT NULL`);
    }

}

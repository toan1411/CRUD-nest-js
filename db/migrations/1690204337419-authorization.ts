import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1690204337419 implements MigrationInterface {
    name = 'Authorization1690204337419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD \`workingTime\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP COLUMN \`workingTime\``);
    }

}

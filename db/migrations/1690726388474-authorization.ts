import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1690726388474 implements MigrationInterface {
    name = 'Authorization1690726388474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD CONSTRAINT \`FK_5eeba4a693910520a0acccee3ff\` FOREIGN KEY (\`userProjectId\`) REFERENCES \`user_project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP FOREIGN KEY \`FK_5eeba4a693910520a0acccee3ff\``);
    }

}

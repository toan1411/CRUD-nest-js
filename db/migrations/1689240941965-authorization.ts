import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1689240941965 implements MigrationInterface {
    name = 'Authorization1689240941965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD CONSTRAINT \`FK_689d5a0fd3a37c30aab320afd8e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP FOREIGN KEY \`FK_689d5a0fd3a37c30aab320afd8e\``);
    }

}

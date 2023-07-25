import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1690207552022 implements MigrationInterface {
    name = 'Authorization1690207552022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD \`userProjectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD UNIQUE INDEX \`IDX_5eeba4a693910520a0acccee3f\` (\`userProjectId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5eeba4a693910520a0acccee3f\` ON \`timesheet\` (\`userProjectId\`)`);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD CONSTRAINT \`FK_5eeba4a693910520a0acccee3ff\` FOREIGN KEY (\`userProjectId\`) REFERENCES \`user_project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP FOREIGN KEY \`FK_5eeba4a693910520a0acccee3ff\``);
        await queryRunner.query(`DROP INDEX \`REL_5eeba4a693910520a0acccee3f\` ON \`timesheet\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP INDEX \`IDX_5eeba4a693910520a0acccee3f\``);
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP COLUMN \`userProjectId\``);
    }

}

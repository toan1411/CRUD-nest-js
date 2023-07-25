import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1690012776117 implements MigrationInterface {
    name = 'Authorization1690012776117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_timesheets_timesheet\` ADD PRIMARY KEY (\`userId\`, \`timesheetId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_061c3a91c88b1f89bb49d09cff\` ON \`user_timesheets_timesheet\` (\`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_1d1cda340e6bfec14cba02b6ec\` ON \`user_timesheets_timesheet\` (\`timesheetId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_timesheets_timesheet\` ADD CONSTRAINT \`FK_061c3a91c88b1f89bb49d09cff1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_timesheets_timesheet\` ADD CONSTRAINT \`FK_1d1cda340e6bfec14cba02b6ecb\` FOREIGN KEY (\`timesheetId\`) REFERENCES \`timesheet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_timesheets_timesheet\` DROP FOREIGN KEY \`FK_1d1cda340e6bfec14cba02b6ecb\``);
        await queryRunner.query(`ALTER TABLE \`user_timesheets_timesheet\` DROP FOREIGN KEY \`FK_061c3a91c88b1f89bb49d09cff1\``);
        await queryRunner.query(`DROP INDEX \`IDX_1d1cda340e6bfec14cba02b6ec\` ON \`user_timesheets_timesheet\``);
        await queryRunner.query(`DROP INDEX \`IDX_061c3a91c88b1f89bb49d09cff\` ON \`user_timesheets_timesheet\``);
        await queryRunner.query(`ALTER TABLE \`user_timesheets_timesheet\` DROP PRIMARY KEY`);
    }

}

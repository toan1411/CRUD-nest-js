import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1690121503028 implements MigrationInterface {
    name = 'Authorization1690121503028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2a9fa09f8ba78a7b9b317a72ba\` ON \`user_project\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_2a9fa09f8ba78a7b9b317a72ba\` ON \`user_project\` (\`timesheetId\`)`);
    }

}

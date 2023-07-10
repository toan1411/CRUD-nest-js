import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1688976638486 implements MigrationInterface {
    name = 'Authorization1688976638486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` varchar(255) NOT NULL`);
    }

}

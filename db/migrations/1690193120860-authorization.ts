import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1690193120860 implements MigrationInterface {
    name = 'Authorization1690193120860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_project\` DROP FOREIGN KEY \`FK_cb5415b5e54f476329451212e9b\``);
        await queryRunner.query(`ALTER TABLE \`user_project\` DROP COLUMN \`projectId\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`timeStart\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`timeStart\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`timeEnd\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`timeEnd\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`timeEnd\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`timeEnd\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`timeStart\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`timeStart\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_project\` ADD \`projectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_project\` ADD CONSTRAINT \`FK_cb5415b5e54f476329451212e9b\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

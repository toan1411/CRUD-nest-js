import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1690083732187 implements MigrationInterface {
    name = 'Authorization1690083732187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_0b155d816f53ae5685adc0514b0\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_1a8725d89cd65783f6cc0046fe7\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_44c3ec718128f38dc4d82e5c02d\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`projectId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userProjectId\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`userProjectId\``);
        await queryRunner.query(`ALTER TABLE \`user_project\` ADD \`projectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_project\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_project\` ADD CONSTRAINT \`FK_cb5415b5e54f476329451212e9b\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_project\` ADD CONSTRAINT \`FK_b88a18e4faeea3bce60d70a4ae3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_project\` DROP FOREIGN KEY \`FK_b88a18e4faeea3bce60d70a4ae3\``);
        await queryRunner.query(`ALTER TABLE \`user_project\` DROP FOREIGN KEY \`FK_cb5415b5e54f476329451212e9b\``);
        await queryRunner.query(`ALTER TABLE \`user_project\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user_project\` DROP COLUMN \`projectId\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`userProjectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userProjectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`projectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_44c3ec718128f38dc4d82e5c02d\` FOREIGN KEY (\`userProjectId\`) REFERENCES \`user_project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_1a8725d89cd65783f6cc0046fe7\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_0b155d816f53ae5685adc0514b0\` FOREIGN KEY (\`userProjectId\`) REFERENCES \`user_project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

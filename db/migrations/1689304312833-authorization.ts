import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1689304312833 implements MigrationInterface {
    name = 'Authorization1689304312833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` CHANGE \`local\` \`locale\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`locale\``);
        await queryRunner.query(`ALTER TABLE \`client\` ADD \`locale\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`locale\``);
        await queryRunner.query(`ALTER TABLE \`client\` ADD \`locale\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client\` CHANGE \`locale\` \`local\` varchar(255) NOT NULL`);
    }

}

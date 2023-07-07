import {MigrationInterface, QueryRunner} from "typeorm";

export class test1688611572503 implements MigrationInterface {
    name = 'test1688611572503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` ADD \`sometime\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`sometime\``);
    }

}

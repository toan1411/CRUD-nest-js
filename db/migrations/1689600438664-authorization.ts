import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorization1689600438664 implements MigrationInterface {
    name = 'Authorization1689600438664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`timesheet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`status\` set ('new', 'pending', 'approved') NOT NULL DEFAULT 'new', \`note\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`timesheet\` ADD CONSTRAINT \`FK_ac58894ff3ba9e26707b7528ecd\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet\` DROP FOREIGN KEY \`FK_ac58894ff3ba9e26707b7528ecd\``);
        await queryRunner.query(`DROP TABLE \`timesheet\``);
    }

}

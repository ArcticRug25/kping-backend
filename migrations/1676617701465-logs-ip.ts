import { MigrationInterface, QueryRunner } from "typeorm";

export class logsIp1676617701465 implements MigrationInterface {
    name = 'logsIp1676617701465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`logs\`
            ADD \`ip\` int NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`logs\` DROP COLUMN \`ip\`
        `);
    }

}

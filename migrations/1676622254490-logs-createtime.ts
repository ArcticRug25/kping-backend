import { MigrationInterface, QueryRunner } from "typeorm";

export class logsCreatetime1676622254490 implements MigrationInterface {
    name = 'logsCreatetime1676622254490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`logs\`
            ADD \`create_time\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`logs\` DROP COLUMN \`ip\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`logs\`
            ADD \`ip\` varchar(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`logs\` DROP COLUMN \`ip\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`logs\`
            ADD \`ip\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`logs\` DROP COLUMN \`create_time\`
        `);
    }

}

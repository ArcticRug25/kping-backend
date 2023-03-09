import { MigrationInterface, QueryRunner } from "typeorm";

export class qrcodeChangeType1678348984084 implements MigrationInterface {
    name = 'qrcodeChangeType1678348984084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`voucher\` CHANGE \`voucher_code\` \`voucher_code\` varchar(255) NOT NULL COMMENT '票券二维码唯一标识'
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher\` DROP COLUMN \`qr_code\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher\`
            ADD \`qr_code\` text NOT NULL COMMENT '二维码'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`voucher\` DROP COLUMN \`qr_code\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher\`
            ADD \`qr_code\` varchar(255) NOT NULL COMMENT '二维码'
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher\` CHANGE \`voucher_code\` \`voucher_code\` varchar(255) NOT NULL
        `);
    }

}

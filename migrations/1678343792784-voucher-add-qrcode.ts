import { MigrationInterface, QueryRunner } from 'typeorm'

export class voucherAddQrcode1678343792784 implements MigrationInterface {
  name = 'voucherAddQrcode1678343792784'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`voucher\`
            ADD \`qr_code\` varchar(255) NOT NULL COMMENT '二维码'
        `)
    await queryRunner.query(`
            ALTER TABLE \`member\` CHANGE \`last_action\` \`last_action\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
        `)
    await queryRunner.query(`
            ALTER TABLE \`member\` CHANGE \`last_action\` \`last_action\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`member\` CHANGE \`last_action\` \`last_action\` datetime NOT NULL
        `)
    await queryRunner.query(`
            ALTER TABLE \`member\` CHANGE \`last_action\` \`last_action\` datetime NOT NULL
        `)
    await queryRunner.query(`
            ALTER TABLE \`voucher\` DROP COLUMN \`qr_code\`
        `)
  }
}

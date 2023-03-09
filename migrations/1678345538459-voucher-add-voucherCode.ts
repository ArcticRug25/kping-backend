import { MigrationInterface, QueryRunner } from 'typeorm'

export class voucherAddVoucherCode1678345538459 implements MigrationInterface {
  name = 'voucherAddVoucherCode1678345538459'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`voucher\`
            ADD UNIQUE INDEX \`IDX_88fa6913fd5006e11a183b38b4\` (\`voucher_code\`)
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`voucher\` DROP INDEX \`IDX_88fa6913fd5006e11a183b38b4\`
        `)
  }
}

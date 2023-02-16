import { MigrationInterface, QueryRunner } from 'typeorm'

export class profile1676446467556 implements MigrationInterface {
  name = 'profile1676446467556'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`profile\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`gender\` int NOT NULL,
                \`photo\` varchar(255) NOT NULL,
                \`address\` varchar(255) NOT NULL,
                \`userId\` int NULL,
                UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` (\`userId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\`
        `)
    await queryRunner.query(`
            DROP INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\`
        `)
    await queryRunner.query(`
            DROP TABLE \`profile\`
        `)
  }
}

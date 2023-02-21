import { MigrationInterface, QueryRunner } from 'typeorm'

export class addVocherMember1676962753301 implements MigrationInterface {
  name = 'addVocherMember1676962753301'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`voucher\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`amount\` int NOT NULL,
                \`expire_at\` datetime NOT NULL COMMENT '过期时间',
                \`used\` tinyint NOT NULL DEFAULT 0,
                \`used_at\` datetime NULL,
                \`min_expense\` int NOT NULL COMMENT '最低消费',
                \`transferrable\` tinyint NOT NULL COMMENT '是否可转让' DEFAULT 0,
                \`stackable\` tinyint NOT NULL COMMENT '是否可叠加使用' DEFAULT 0,
                \`useWithOther\` tinyint NOT NULL COMMENT '是否和其他活动一起使用' DEFAULT 0,
                \`memberId\` int NULL,
                \`merchantId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`member\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL,
                \`phonenumber\` varchar(255) NOT NULL,
                \`gender\` enum ('male', 'female', 'unknown') NOT NULL DEFAULT 'unknown',
                \`isHalal\` tinyint NOT NULL,
                \`distance\` varchar(255) NOT NULL,
                \`last_action\` datetime NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`merchants_members\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`join_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`memberId\` int NULL,
                \`merchantId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`merchant\` (
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`id\` int NOT NULL AUTO_INCREMENT,
                UNIQUE INDEX \`IDX_0369e7853b1a4d8e366c7b3b79\` (\`username\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`logs\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`path\` varchar(255) NOT NULL,
                \`method\` varchar(255) NOT NULL,
                \`data\` varchar(255) NOT NULL,
                \`result\` int NOT NULL,
                \`ip\` varchar(255) NOT NULL,
                \`create_time\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6),
                \`merchantId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`profile\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`gender\` int NOT NULL,
                \`photo\` varchar(255) NOT NULL,
                \`address\` varchar(255) NOT NULL,
                \`merchantId\` int NULL,
                UNIQUE INDEX \`REL_dbf960f493fd5a3afb1c3de204\` (\`merchantId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            ALTER TABLE \`logs\` DROP COLUMN \`merchantId\`
        `)
    await queryRunner.query(`
            DROP INDEX \`REL_dbf960f493fd5a3afb1c3de204\` ON \`profile\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\` DROP COLUMN \`merchantId\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`logs\`
            ADD \`merchantId\` int NULL
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD \`merchantId\` int NULL
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD UNIQUE INDEX \`IDX_dbf960f493fd5a3afb1c3de204\` (\`merchantId\`)
        `)
    await queryRunner.query(`
            ALTER TABLE \`logs\`
            ADD \`userId\` int NULL
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD \`userId\` int NULL
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD UNIQUE INDEX \`IDX_a24972ebd73b106250713dcddd\` (\`userId\`)
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_dbf960f493fd5a3afb1c3de204\` ON \`profile\` (\`merchantId\`)
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\` (\`userId\`)
        `)
    await queryRunner.query(`
            ALTER TABLE \`voucher\`
            ADD CONSTRAINT \`FK_f6e7de45b0a2c4d395f9c46e8d9\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`voucher\`
            ADD CONSTRAINT \`FK_9e6e31eecf31255705c4df09568\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`merchants_members\`
            ADD CONSTRAINT \`FK_7dc77deea1155371923e55d3602\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`merchants_members\`
            ADD CONSTRAINT \`FK_1abca3b07543549bd49d59adf9d\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`logs\`
            ADD CONSTRAINT \`FK_506d504dcbd0ef03872ef1c750c\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD CONSTRAINT \`FK_dbf960f493fd5a3afb1c3de2043\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`logs\`
            ADD CONSTRAINT \`FK_a1196a1956403417fe3a0343390\` FOREIGN KEY (\`userId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`logs\` DROP FOREIGN KEY \`FK_a1196a1956403417fe3a0343390\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_dbf960f493fd5a3afb1c3de2043\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`logs\` DROP FOREIGN KEY \`FK_506d504dcbd0ef03872ef1c750c\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`merchants_members\` DROP FOREIGN KEY \`FK_1abca3b07543549bd49d59adf9d\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`merchants_members\` DROP FOREIGN KEY \`FK_7dc77deea1155371923e55d3602\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`voucher\` DROP FOREIGN KEY \`FK_9e6e31eecf31255705c4df09568\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`voucher\` DROP FOREIGN KEY \`FK_f6e7de45b0a2c4d395f9c46e8d9\`
        `)
    await queryRunner.query(`
            DROP INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\`
        `)
    await queryRunner.query(`
            DROP INDEX \`REL_dbf960f493fd5a3afb1c3de204\` ON \`profile\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\` DROP INDEX \`IDX_a24972ebd73b106250713dcddd\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\` DROP COLUMN \`userId\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`logs\` DROP COLUMN \`userId\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\` DROP INDEX \`IDX_dbf960f493fd5a3afb1c3de204\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\` DROP COLUMN \`merchantId\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`logs\` DROP COLUMN \`merchantId\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD \`merchantId\` int NULL
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_dbf960f493fd5a3afb1c3de204\` ON \`profile\` (\`merchantId\`)
        `)
    await queryRunner.query(`
            ALTER TABLE \`logs\`
            ADD \`merchantId\` int NULL
        `)
    await queryRunner.query(`
            DROP INDEX \`REL_dbf960f493fd5a3afb1c3de204\` ON \`profile\`
        `)
    await queryRunner.query(`
            DROP TABLE \`profile\`
        `)
    await queryRunner.query(`
            DROP TABLE \`logs\`
        `)
    await queryRunner.query(`
            DROP INDEX \`IDX_0369e7853b1a4d8e366c7b3b79\` ON \`merchant\`
        `)
    await queryRunner.query(`
            DROP TABLE \`merchant\`
        `)
    await queryRunner.query(`
            DROP TABLE \`merchants_members\`
        `)
    await queryRunner.query(`
            DROP TABLE \`member\`
        `)
    await queryRunner.query(`
            DROP TABLE \`voucher\`
        `)
  }
}

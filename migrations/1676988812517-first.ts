import { MigrationInterface, QueryRunner } from "typeorm";

export class first1676988812517 implements MigrationInterface {
    name = 'first1676988812517'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
        `);
        await queryRunner.query(`
            CREATE TABLE \`vouchers_members\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`create_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`memberId\` int NULL,
                \`voucherId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`voucher\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`amount\` int NOT NULL,
                \`is_discount\` tinyint NOT NULL COMMENT '是否是折扣券，还是满减券' DEFAULT 0,
                \`expire_at\` datetime NOT NULL COMMENT '过期时间',
                \`used\` tinyint NOT NULL DEFAULT 0,
                \`total_count\` int NOT NULL COMMENT '优惠券所有数量',
                \`remain_count\` int NOT NULL COMMENT '优惠券剩余领取数量',
                \`used_at\` datetime NULL,
                \`min_expense\` int NOT NULL COMMENT '最低消费',
                \`transferrable\` tinyint NOT NULL COMMENT '是否可转让' DEFAULT 0,
                \`stackable\` tinyint NOT NULL COMMENT '是否可叠加使用' DEFAULT 0,
                \`useWithOther\` tinyint NOT NULL COMMENT '是否和其他活动一起使用' DEFAULT 0,
                \`create_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`merchantId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`profile\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`gender\` int NOT NULL,
                \`photo\` varchar(255) NOT NULL,
                \`address\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`merchant\` (
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`profileId\` int NULL,
                UNIQUE INDEX \`IDX_0369e7853b1a4d8e366c7b3b79\` (\`username\`),
                UNIQUE INDEX \`REL_f1885c60cb0d3de28e2a3cd128\` (\`profileId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`merchants_members\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`join_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`memberId\` int NULL,
                \`merchantId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
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
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_f1885c60cb0d3de28e2a3cd128\` ON \`merchant\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant\` DROP COLUMN \`profileId\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant\`
            ADD \`profileId\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant\`
            ADD UNIQUE INDEX \`IDX_f1885c60cb0d3de28e2a3cd128\` (\`profileId\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD \`userId\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD UNIQUE INDEX \`IDX_a24972ebd73b106250713dcddd\` (\`userId\`)
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_f1885c60cb0d3de28e2a3cd128\` ON \`merchant\` (\`profileId\`)
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\` (\`userId\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`logs\`
            ADD CONSTRAINT \`FK_506d504dcbd0ef03872ef1c750c\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`vouchers_members\`
            ADD CONSTRAINT \`FK_03d4d73888d216904c7a343086e\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`vouchers_members\`
            ADD CONSTRAINT \`FK_d9a4dd2cd14589ee0c4649ca20b\` FOREIGN KEY (\`voucherId\`) REFERENCES \`voucher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher\`
            ADD CONSTRAINT \`FK_9e6e31eecf31255705c4df09568\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant\`
            ADD CONSTRAINT \`FK_f1885c60cb0d3de28e2a3cd128f\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchants_members\`
            ADD CONSTRAINT \`FK_7dc77deea1155371923e55d3602\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchants_members\`
            ADD CONSTRAINT \`FK_1abca3b07543549bd49d59adf9d\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchants_members\` DROP FOREIGN KEY \`FK_1abca3b07543549bd49d59adf9d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchants_members\` DROP FOREIGN KEY \`FK_7dc77deea1155371923e55d3602\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant\` DROP FOREIGN KEY \`FK_f1885c60cb0d3de28e2a3cd128f\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher\` DROP FOREIGN KEY \`FK_9e6e31eecf31255705c4df09568\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`vouchers_members\` DROP FOREIGN KEY \`FK_d9a4dd2cd14589ee0c4649ca20b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`vouchers_members\` DROP FOREIGN KEY \`FK_03d4d73888d216904c7a343086e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`logs\` DROP FOREIGN KEY \`FK_506d504dcbd0ef03872ef1c750c\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_f1885c60cb0d3de28e2a3cd128\` ON \`merchant\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\` DROP INDEX \`IDX_a24972ebd73b106250713dcddd\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\` DROP COLUMN \`userId\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant\` DROP INDEX \`IDX_f1885c60cb0d3de28e2a3cd128\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant\` DROP COLUMN \`profileId\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant\`
            ADD \`profileId\` int NULL
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_f1885c60cb0d3de28e2a3cd128\` ON \`merchant\` (\`profileId\`)
        `);
        await queryRunner.query(`
            DROP TABLE \`member\`
        `);
        await queryRunner.query(`
            DROP TABLE \`merchants_members\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_f1885c60cb0d3de28e2a3cd128\` ON \`merchant\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_0369e7853b1a4d8e366c7b3b79\` ON \`merchant\`
        `);
        await queryRunner.query(`
            DROP TABLE \`merchant\`
        `);
        await queryRunner.query(`
            DROP TABLE \`profile\`
        `);
        await queryRunner.query(`
            DROP TABLE \`voucher\`
        `);
        await queryRunner.query(`
            DROP TABLE \`vouchers_members\`
        `);
        await queryRunner.query(`
            DROP TABLE \`logs\`
        `);
    }

}

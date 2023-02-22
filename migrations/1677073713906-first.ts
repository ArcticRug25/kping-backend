import { MigrationInterface, QueryRunner } from "typeorm";

export class first1677073713906 implements MigrationInterface {
    name = 'first1677073713906'

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
                \`merchant_id\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`voucher_member\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`create_time\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`member_id\` int NULL,
                \`voucher_id\` int NULL,
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
                \`use_with_other\` tinyint NOT NULL COMMENT '是否和其他活动一起使用' DEFAULT 0,
                \`create_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`merchant_id\` int NULL,
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
                \`profile_id\` int NULL,
                UNIQUE INDEX \`IDX_0369e7853b1a4d8e366c7b3b79\` (\`username\`),
                UNIQUE INDEX \`REL_f6a174e08daeb0c11b090d2603\` (\`profile_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`merchant_member\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`join_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`member_id\` int NULL,
                \`merchant_id\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`member\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL,
                \`phonenumber\` varchar(255) NOT NULL,
                \`gender\` enum ('male', 'female', 'unknown') NOT NULL DEFAULT 'unknown',
                \`is_halal\` tinyint NOT NULL,
                \`distance\` varchar(255) NOT NULL,
                \`last_action\` datetime NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`logs\`
            ADD CONSTRAINT \`FK_4ed2930731d82f3354af304f3f1\` FOREIGN KEY (\`merchant_id\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher_member\`
            ADD CONSTRAINT \`FK_8efdc13bc96c56b8e29ec8df929\` FOREIGN KEY (\`member_id\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher_member\`
            ADD CONSTRAINT \`FK_9b68d58f267794c17839194697e\` FOREIGN KEY (\`voucher_id\`) REFERENCES \`voucher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher\`
            ADD CONSTRAINT \`FK_bef223b255a658ba4ee0382d176\` FOREIGN KEY (\`merchant_id\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant\`
            ADD CONSTRAINT \`FK_f6a174e08daeb0c11b090d2603b\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant_member\`
            ADD CONSTRAINT \`FK_bf4d0384280e0a2936e499a6573\` FOREIGN KEY (\`member_id\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant_member\`
            ADD CONSTRAINT \`FK_5003ad20fee3cdb5496c99abc90\` FOREIGN KEY (\`merchant_id\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`merchant_member\` DROP FOREIGN KEY \`FK_5003ad20fee3cdb5496c99abc90\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant_member\` DROP FOREIGN KEY \`FK_bf4d0384280e0a2936e499a6573\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`merchant\` DROP FOREIGN KEY \`FK_f6a174e08daeb0c11b090d2603b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher\` DROP FOREIGN KEY \`FK_bef223b255a658ba4ee0382d176\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher_member\` DROP FOREIGN KEY \`FK_9b68d58f267794c17839194697e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`voucher_member\` DROP FOREIGN KEY \`FK_8efdc13bc96c56b8e29ec8df929\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`logs\` DROP FOREIGN KEY \`FK_4ed2930731d82f3354af304f3f1\`
        `);
        await queryRunner.query(`
            DROP TABLE \`member\`
        `);
        await queryRunner.query(`
            DROP TABLE \`merchant_member\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_f6a174e08daeb0c11b090d2603\` ON \`merchant\`
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
            DROP TABLE \`voucher_member\`
        `);
        await queryRunner.query(`
            DROP TABLE \`logs\`
        `);
    }

}

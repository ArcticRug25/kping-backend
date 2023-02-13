import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'wyw123456',
  database: 'test',
  synchronize: true,
  logging: false,
} as TypeOrmModuleOptions

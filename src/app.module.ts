import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LogsModule } from './modules/logs/logs.module'
import { getConfig } from './utils/config'
import { UserModule } from './modules/user/user.module'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { connectionParams } from '../ormconfig'

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [getConfig] }),
    TypeOrmModule.forRoot(connectionParams as TypeOrmModuleOptions),
    LogsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

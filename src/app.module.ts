import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LogsModule } from './modules/logs/logs.module'
import { getConfig } from './utils/config'

@Module({
  imports: [ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [getConfig] }), LogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

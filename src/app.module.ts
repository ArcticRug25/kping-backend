import { Module, ClassSerializerInterceptor } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { connectionParams } from '../ormconfig'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { LogsModule } from './modules/logs/logs.module'
import { MerchantModule } from './modules/merchant/merchant.module'
import { getConfig } from './utils/config'
import { MemberModule } from './modules/member/member.module'
import { VoucherModule } from './modules/voucher/voucher.module'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [getConfig] }),
    TypeOrmModule.forRoot(connectionParams as TypeOrmModuleOptions),
    LogsModule,
    MerchantModule,
    AuthModule,
    MemberModule,
    VoucherModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}

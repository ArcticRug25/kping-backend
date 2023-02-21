import { Global, Module } from '@nestjs/common'
import { MerchantService } from './merchant.service'
import { MerchantController } from './merchant.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Merchant } from './entities/merchant.entity'
import { RedisService } from '../redis/redis.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Merchant])],
  controllers: [MerchantController],
  providers: [MerchantService, RedisService],
  exports: [MerchantService],
})
export class MerchantModule {}

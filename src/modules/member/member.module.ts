import { Module } from '@nestjs/common'
import { MemberService } from './member.service'
import { MemberController } from './member.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Member } from './entities/member.entity'
import { VoucherMember } from '../voucher/entities/voucher-member.entity'
import { MerchantMember } from './entities/merchant-member.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Member, VoucherMember, MerchantMember])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}

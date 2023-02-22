import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { VoucherMember } from '../voucher/entities/voucher-member.entity'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { Member } from './entities/member.entity'
import { MerchantMember } from './entities/merchant-member.entity'

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private readonly memberRepo: Repository<Member>,
    @InjectRepository(VoucherMember) private readonly voucherMemberRepo: Repository<VoucherMember>,
    @InjectRepository(MerchantMember) private readonly merchantMemberRepo: Repository<MerchantMember>,
  ) {}

  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member'
  }

  async findAll(userId) {
    // const a = await this.voucherMemberRepo
    //   .createQueryBuilder('vm')
    //   .leftJoinAndSelect('vm.member', 'member')
    //   .leftJoinAndSelect('vm.voucher', 'voucher')
    //   .getMany()
    // const a = await this.merchantMemberRepo
    //   .createQueryBuilder('mm')
    //   .leftJoinAndSelect('mm.member', 'member')
    //   .andWhere('mm.merchantId = :userId', { userId })
    //   .getMany()
    // const a = await this.memberRepo
    //   .createQueryBuilder('member')
    //   .leftJoinAndSelect('member.vouchers', 'voucher').leftJoinAndMapMany
    //   .getMany()
    return 'a'
  }

  findOne(id: number) {
    return `This action returns a #${id} member`
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`
  }

  remove(id: number) {
    return `This action removes a #${id} member`
  }
}

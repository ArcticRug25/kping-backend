import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { VoucherMember } from '../voucher/entities/voucher-member.entity'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { Member } from './entities/member.entity'
import { MerchantMember } from './entities/merchant-member.entity'
import { Merchant } from '../merchant/entities/merchant.entity'
import { GetMemberListDto } from './dto/get-member-list.dto'
import { conditionUtils, conditionBetweenUtils } from '../../utils/db.helper'
import { PaginatedDto } from '../../common/dto/paginated.dto'

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private readonly memberRepo: Repository<Member>,
    @InjectRepository(VoucherMember) private readonly voucherMemberRepo: Repository<VoucherMember>,
    @InjectRepository(MerchantMember) private readonly merchantMemberRepo: Repository<MerchantMember>,
    @InjectRepository(Merchant) private readonly merchantRepo: Repository<Merchant>,
  ) {}

  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member'
  }

  async findAll(userId, query: GetMemberListDto): Promise<PaginatedDto<Member>> {
    const { gender, isHalal, joinStart, joinEnd, actionStart, actionEnd, distanceFrom, distanceTo, take, skip } = query
    console.log('query', query)
    const queryConditionMap = {
      'member.gender': gender,
      'member.isHalal': isHalal,
    }

    let queryBuilder = this.memberRepo
      .createQueryBuilder('member')
      .leftJoinAndMapOne('member.joinTime', 'MerchantMember', 'mm', 'mm.member_id = member.id')
      .leftJoin('member.voucherMember', 'vm')
      .leftJoinAndMapMany('member.vouchers', 'Voucher', 'voucher', 'voucher.id = vm.voucher_id')
      .where('mm.merchant_id = :userId', { userId })

    if (joinStart && joinEnd) {
      queryBuilder = conditionBetweenUtils(queryBuilder, 'mm', 'join_time', joinStart, joinEnd)
    }

    if (actionStart && actionEnd) {
      queryBuilder = conditionBetweenUtils(queryBuilder, 'member', 'last_action', actionStart, actionEnd)
    }

    if (distanceFrom && distanceTo) {
      queryBuilder = conditionBetweenUtils(queryBuilder, 'member', 'distance', distanceFrom, distanceTo)
    }

    queryBuilder = conditionUtils<Member>(queryBuilder, queryConditionMap)

    const [rows, total] = await queryBuilder.skip(skip).take(take).getManyAndCount()

    return {
      rows,
      total,
    }
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

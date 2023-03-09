import { Injectable } from '@nestjs/common'
import { CreateVoucherDto } from './dto/create-voucher.dto'
import { UpdateVoucherDto } from './dto/update-voucher.dto'
import { getVoucherListDto } from './entities/get-voucher-list.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Voucher } from './entities/voucher.entity'
import { Repository } from 'typeorm'

@Injectable()
export class VoucherService {
  constructor(@InjectRepository(Voucher) private readonly voucherRepo: Repository<Voucher>) {}

  create(userId, createVoucherDto: CreateVoucherDto) {
    return 'This action adds a new voucher'
  }

  async findAll(userId, query: getVoucherListDto) {
    const { skip, take } = query
    const [rows, total] = await this.voucherRepo.findAndCount({
      skip,
      take,
      where: {
        merchant: {
          id: userId,
        },
      },
      order: {
        createTime: 'DESC',
      },
    })
    return {
      rows,
      total,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} voucher`
  }

  update(id: number, updateVoucherDto: UpdateVoucherDto) {
    return `This action updates a #${id} voucher`
  }

  remove(id: number) {
    return `This action removes a #${id} voucher`
  }
}

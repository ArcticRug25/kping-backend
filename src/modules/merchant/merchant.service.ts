import { Body, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import argon2 from 'argon2'
import { Repository } from 'typeorm'
import { CreateMerchantDto } from './dto/create-merchant.dto'
import { UpdateMerchantDto } from './dto/update-merchant.dto'
import { Merchant } from './entities/merchant.entity'
import { RedisService } from '../redis/redis.service'

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant) private readonly merchantRepo: Repository<Merchant>,
    private readonly redisService: RedisService,
  ) {}

  async create(@Body() createMerchantDto: CreateMerchantDto) {
    const merchantTpl = await this.merchantRepo.create(createMerchantDto)
    merchantTpl.password = await argon2.hash(merchantTpl.password)
    return await this.merchantRepo.save(merchantTpl)
  }

  async findAll() {
    const a: any = 2
    return this.merchantRepo.find()
  }

  find(username: string) {
    return this.merchantRepo.findOne({ where: { username } })
  }

  findOne(id: number) {
    return `This action returns a #${id} merchant`
  }

  update(id: number, updateMerchantDto: UpdateMerchantDto) {
    return `This action updates a #${id} merchant`
  }

  remove(id: number) {
    return `This action removes a #${id} merchant`
  }
}

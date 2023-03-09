import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { VoucherService } from './voucher.service'
import { CreateVoucherDto } from './dto/create-voucher.dto'
import { UpdateVoucherDto } from './dto/update-voucher.dto'
import { PaginationPipe } from '../../common/pipe/pagination.pipe'
import { User, TokenUser } from '../../common/decorator/user.decorator'

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto, @User() user: TokenUser) {
    return this.voucherService.create(user.userId, createVoucherDto)
  }

  @Get('list')
  findAll(@Query(PaginationPipe) query, @User() user: TokenUser) {
    return this.voucherService.findAll(user.userId, query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
    return this.voucherService.update(+id, updateVoucherDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherService.remove(+id)
  }
}

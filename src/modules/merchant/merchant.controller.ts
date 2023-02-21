import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Public } from 'src/common/decorator/public.decorator'
import { CreateMerchantDto } from './dto/create-merchant.dto'
import { UpdateMerchantDto } from './dto/update-merchant.dto'
import { MerchantService } from './merchant.service'

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantService.create(createMerchantDto)
  }

  @Get()
  @Public()
  findAll() {
    return this.merchantService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMerchantDto: UpdateMerchantDto) {
    return this.merchantService.update(+id, updateMerchantDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantService.remove(+id)
  }
}

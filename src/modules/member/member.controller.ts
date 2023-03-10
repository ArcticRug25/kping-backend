import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common'
import { MemberService } from './member.service'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { TokenUser, User } from '../../common/decorator/user.decorator'
import { GetMemberListDto } from './dto/get-member-list.dto'
import { PaginationPipe } from 'src/common/pipe/pagination.pipe'

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto)
  }

  @Get('list')
  findAll(@Query(PaginationPipe) query: GetMemberListDto, @User() user: TokenUser) {
    return this.memberService.findAll(user.userId, query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id)
  }
}

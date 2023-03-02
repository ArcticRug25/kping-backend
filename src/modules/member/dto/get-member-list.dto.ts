import { Type } from 'class-transformer'
import { IsOptional, Length } from 'class-validator'
import { PaginationDto } from '../../../common/dto/pagination.dto'
import { Gender } from '../entities/member.entity'

export class GetMemberListDto extends PaginationDto {
  @IsOptional()
  @Length(0, 30)
  name: string

  @IsOptional()
  gender: Gender

  @IsOptional()
  isHalal: number

  @IsOptional()
  @Type()
  joinStart: Date

  @IsOptional()
  @Type()
  joinEnd: Date

  @IsOptional()
  @Type()
  actionStart: Date

  @IsOptional()
  @Type()
  actionEnd: Date

  @IsOptional()
  distanceFrom: number

  @IsOptional()
  distanceTo: number

  @IsOptional()
  orderBy: (Gender | 'isHalal')[]
}

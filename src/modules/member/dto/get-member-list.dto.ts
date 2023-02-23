import { IsOptional } from 'class-validator'
import { Gender } from '../entities/member.entity'
import { Transform } from 'class-transformer'

export class GetMemberListDto {
  @IsOptional()
  gender: Gender

  @IsOptional()
  isHalal: number

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  joinStart: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  joinEnd: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  actionStart: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  actionEnd: Date

  @IsOptional()
  distanceFrom: number

  @IsOptional()
  distanceTo: number
}

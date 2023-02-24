import { Type } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class PaginationDto {
  @IsOptional()
  @Type()
  @IsNumber()
  public pageNum?: number

  @IsOptional()
  @Type()
  @IsNumber()
  public pageSize?: number

  public skip: number

  public take: number
}

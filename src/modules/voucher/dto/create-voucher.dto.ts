import { Type } from 'class-transformer'
import { IsBoolean, IsDate, IsNumber, Max, Min, ValidationArguments } from 'class-validator'
import { IsFutureDate, IsRangeAmount } from '../../../common/decorator/validate.decorator'

export class CreateVoucherDto {
  @IsNumber()
  @IsRangeAmount('isDiscount', {
    message: (validationArguments: ValidationArguments) => {
      const [relatedPropertyName] = validationArguments.constraints
      const isDiscount = (validationArguments.object as CreateVoucherDto)[relatedPropertyName]
      return isDiscount ? 'Discount amount must be between 1 and 99' : 'Amount must be between 1 and 999'
    },
  })
  amount: number

  @IsBoolean()
  isDiscount: boolean

  @Type()
  @IsDate()
  @IsFutureDate({ message: 'Expired date must be in the future' })
  expiredAt: Date

  @IsNumber()
  @Min(1)
  @Max(999)
  totalCount: number

  @IsNumber()
  @Min(1)
  @Max(9999)
  minimumExpense: number
}

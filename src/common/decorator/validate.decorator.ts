import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { CreateVoucherDto } from '../../modules/voucher/dto/create-voucher.dto'

// 验证金额范围，根据 isDiscount 的值来判断
export function IsRangeAmount(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isRangeAmount',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const isDiscount = (args.object as CreateVoucherDto)[relatedPropertyName]
          if (isDiscount && (value < 1 || value > 99)) {
            return false
          } else if (!isDiscount && (value < 1 || value > 999)) {
            return false
          }
          return true
        },
      },
    })
  }
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value.getTime() > Date.now()
        },
      },
    })
  }
}

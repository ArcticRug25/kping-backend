import { ValidationPipe, ValidationError } from '@nestjs/common'

export default class CustomValidate extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): any {
    super.flattenValidationErrors(validationErrors)
    const errorMsgs = validationErrors.map((error) => ({
      field: error.property,
      message: Object.values(error.constraints),
    }))
    return errorMsgs
  }
}

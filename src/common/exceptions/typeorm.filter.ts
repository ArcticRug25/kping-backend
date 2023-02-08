import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { QueryFailedError, TypeORMError } from 'typeorm'

@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    let code = HttpStatus.INTERNAL_SERVER_ERROR

    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno
    }
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: code,
      timestramp: new Date().toISOString(),
      message: exception.message,
    })
  }
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, LoggerService, HttpStatus } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response: Response = ctx.getResponse()
    const errResponse = exception.getResponse() as any
    const status = exception.getStatus()
    let message = exception.message || exception.name

    if (status === HttpStatus.BAD_REQUEST && errResponse.message.length) {
      message = errResponse.message
    }

    this.logger.error(exception.message, exception.stack)
    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      message,
    })
  }
}

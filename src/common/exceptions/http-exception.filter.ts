import { ArgumentsHost, Catch, ExceptionFilter, HttpException, LoggerService } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response: Response = ctx.getResponse()
    // const request: Request = ctx.getRequest()
    const status = exception.getStatus()
    this.logger.error(exception.message, exception.stack)
    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      message: exception.message || exception.name,
    })
  }
}

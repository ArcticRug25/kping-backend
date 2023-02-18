import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpAdapterHost,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common'
import { Request, Response } from 'express'
import requestIp from 'request-ip'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService, private httpAdapterHost: HttpAdapterHost) {}
  catch(exception: Error, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const response: Response = ctx.getResponse()
    const request: Request = ctx.getRequest()

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const msg: string = exception['response'] || exception['message'] || 'Internal Server Error'

    const responsBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      path: request.originalUrl,
      timestamp: new Date().toISOString(),
      ip: requestIp.getClientIp(request),
      exception: exception['name'],
      method: request.method,
      error: msg,
      user: request.user,
      status: httpStatus,
    }

    this.logger.error(msg, exception.stack, responsBody)
    httpAdapter.reply(response, responsBody, httpStatus)
  }
}

import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter'
// 请求限制
import rateLimit from 'express-rate-limit'
// 安全头
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AllExceptionFilter } from './common/exceptions/all-exception.filter'
import CustomValidate from './common/validate/custom.validate'
import { JwtAuthGuard } from './common/guards/jwt-auth.guard'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  app.use(helmet())

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  )

  // 全局管道
  app.useGlobalPipes(new CustomValidate())

  const logger = new Logger()
  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter), new HttpExceptionFilter(logger))

  app.useGlobalPipes(
    new ValidationPipe({
      // 去除在类上不存在的内容
      whitelist: true,
    }),
  )

  app.useGlobalInterceptors(new TransformInterceptor(), new ClassSerializerInterceptor(app.get(Reflector)))

  app.useGlobalGuards(new JwtAuthGuard(new Reflector()))

  app.setGlobalPrefix('api')

  await app.listen(3001)
}
bootstrap()

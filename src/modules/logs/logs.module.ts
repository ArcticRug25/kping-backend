import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston'
import { LogLevel } from 'src/enum/log.enum'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import TransportStream from 'winston-transport'
import { ConfigEnum } from '../../enum/config.enum'
import { Logs } from './entities/logs.entity'
import { LogsService } from './logs.service'
import { LogsController } from './logs.controller'

const consoleTransports = new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike()),
})

class TypeOrmTransport extends TransportStream {
  constructor(private readonly logsService: LogsService) {
    super()
  }

  async log(info: any, next: () => void) {
    if (info.level === LogLevel.WARN || info.level === LogLevel.ERROR) {
      this.logsService.log(info)
    }
    next()
  }
}

const dailyWarnTransports = createDailyTransportsByLevel('warn', 'error')

const dailyInfoTransports = createDailyTransportsByLevel('info', 'application')

function createDailyTransportsByLevel(fileName: string, level: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${fileName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
  })
}

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Logs]),
    WinstonModule.forRootAsync({
      inject: [ConfigService, LogsService],
      useFactory: (configService: ConfigService, logsService: LogsService) => {
        const isLogOn = configService.get(ConfigEnum.LOG).on
        return {
          transports: [
            consoleTransports,
            new TypeOrmTransport(logsService),
            ...(isLogOn ? [dailyWarnTransports, dailyInfoTransports] : []),
          ],
          format: winston.format.timestamp(),
        } as WinstonModuleOptions
      },
    }),
  ],
  controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}

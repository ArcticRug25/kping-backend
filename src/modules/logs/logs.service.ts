import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Logs } from './entities/logs.entity'

@Injectable()
export class LogsService {
  constructor(@InjectRepository(Logs) private readonly logsRepo: Repository<Logs>) {}

  findAll() {
    return this.logsRepo.find()
  }

  async log(info) {
    console.log('info', info)
    const logTpl = await this.logsRepo.create({
      path: info.context.path,
      method: info.context.method,
      data: JSON.stringify(info.context.body),
      result: info.context.status,
      ip: info.context.ip,
    })
    const userId = info.context.user?.userId
    if (userId) {
      logTpl.user = userId
    }
    this.logsRepo.save(logTpl)
  }
}

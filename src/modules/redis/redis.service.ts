import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'
import { ConfigService } from '@nestjs/config'
import { RedisConfigEnum } from '../../enum/config.enum'

@Injectable()
export class RedisService {
  private readonly redisClient: Redis
  constructor(private readonly configService: ConfigService) {
    this.redisClient = new Redis({
      host: this.configService.get(RedisConfigEnum.host),
      port: this.configService.get(RedisConfigEnum.port),
      db: this.configService.get(RedisConfigEnum.db),
      password: this.configService.get(RedisConfigEnum.password),
    })
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key)
  }

  async set(key: string, value: string): Promise<string> {
    return await this.redisClient.set(key, value)
  }

  async setWithExpire(key: string, value: string, expireSeconds: number): Promise<string> {
    const result = await this.redisClient.set(key, value)
    await this.redisClient.expire(key, expireSeconds)
    return result
  }

  async del(key: string): Promise<number> {
    return await this.redisClient.del(key)
  }
}

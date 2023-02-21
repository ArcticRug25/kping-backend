import { Injectable } from '@nestjs/common'
import Core from '@alicloud/pop-core'
import { ConfigService } from '@nestjs/config'
import { ConfigEnum, AliCloudConfigEnum } from '../../enum/config.enum'

@Injectable()
export class AlicloudService {
  private readonly client: Core

  constructor(private readonly configService: ConfigService) {
    const alicloudParams = this.configService.get(ConfigEnum.ALI_CLOUD)
    this.client = new Core({
      accessKeyId: alicloudParams[AliCloudConfigEnum.accessKeyId],
      accessKeySecret: alicloudParams[AliCloudConfigEnum.accessKeySecret],
      endpoint: '',
      apiVersion: '',
    })
  }
}

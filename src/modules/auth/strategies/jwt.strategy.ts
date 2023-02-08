import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    // const tokenConfig: ITokenConfig = configService.get()
    super({
      // 解析用户提交的 Bearer Token header 数据w
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 加密码的 secret
      secretOrKey: 'a',
    })
  }
  async validate({ sub: id }) {
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     id,
    //   },
    // })
    // return user
  }
}

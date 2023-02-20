import { Controller, Body, Post, Get, Res, Req, ForbiddenException, Header, Session } from '@nestjs/common'
import { Public } from 'src/common/decorator/public.decorator'
import { AuthService } from './auth.service'
import { SigninUserDto } from './dto/signin-user.dto'
import svgCaptcha from 'svg-captcha'
import { ConfigService } from '@nestjs/config'
import { CaptchaEnum, ConfigEnum } from '../../enum/config.enum'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}
  @Post('/signin')
  @Public()
  async signin(@Body() dto: SigninUserDto, @Session() session: Record<string, any>) {
    console.log('req.session', session, dto)
    if (session.code.toLocaleLowerCase() !== dto?.code?.toLocaleLowerCase()) {
      throw new ForbiddenException('验证码错误')
    }
    const { username, password } = dto
    const token = await this.authService.signin(username, password)
    return {
      access_token: token,
    }
  }

  @Post('/signup')
  @Public()
  signup(@Body() signinUserDto: SigninUserDto) {
    const { username, password } = signinUserDto
    return this.authService.signup(username, password)
  }

  @Get('/code')
  @Public()
  createCaptcha(@Req() req: Request, @Res() res) {
    const captchaParams = this.configService.get(ConfigEnum.CAPTCHA)
    const captcha = svgCaptcha.create({
      size: captchaParams[CaptchaEnum.size],
      fontSize: captchaParams[CaptchaEnum.fontSize],
      width: captchaParams[CaptchaEnum.width],
      height: captchaParams[CaptchaEnum.height],
      background: captchaParams[CaptchaEnum.background],
    })
    req.session['code'] = captcha.text
    res.type('image/svg+xml')
    res.send(captcha.data)
  }
}

import { Controller, Body, Post } from '@nestjs/common'
import { Public } from 'src/common/decorator/public.decorator'
import { AuthService } from './auth.service'
import { SigninUserDto } from './dto/signin-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signin')
  @Public()
  async signin(@Body() dto: SigninUserDto) {
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
}

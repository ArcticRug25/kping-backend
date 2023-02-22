import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export interface TokenUser {
  userId: number
  username: string
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user as TokenUser
})

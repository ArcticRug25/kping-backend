import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ConfigEnum } from '../../enum/config.enum'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get(ConfigEnum.SECRET),
          signOptions: {
            expiresIn: '1d',
          },
        }
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
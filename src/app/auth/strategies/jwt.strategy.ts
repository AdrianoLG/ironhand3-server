import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { UserService } from '../../user/user.service'
import { JwtPayload } from '../auth.service'

const cookieExtractor = (req: Request): string | null => {
  return req?.cookies?.access_token ?? null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.getUserById(payload.sub as any)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}

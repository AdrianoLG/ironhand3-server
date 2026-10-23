import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { ForgotPasswordInput } from './dto/forgot-password.input'
import { LoginInput } from './dto/login.input'
import { ResetPasswordInput } from './dto/reset-password.input'
import { MailService } from './mail.service'

export interface JwtPayload {
  sub: string
  email: string
}

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000 // 1 hora

const hashToken = (token: string) =>
  crypto.createHash('sha256').update(token).digest('hex')

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(loginInput: LoginInput): Promise<User> {
    const user = await this.userService.findByEmail(loginInput.email)
    if (!user || !(await bcrypt.compare(loginInput.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas')
    }
    return user
  }

  signToken(user: User): string {
    const payload: JwtPayload = { sub: String(user._id), email: user.email }
    return this.jwtService.sign(payload)
  }

  async forgotPassword(forgotPasswordInput: ForgotPasswordInput) {
    const user = await this.userService.findByEmail(forgotPasswordInput.email)
    // Siempre respondemos igual, exista o no el email, para no filtrar usuarios
    if (!user) return true

    const rawToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS)
    await this.userService.setResetPasswordToken(
      user._id,
      hashToken(rawToken),
      expiresAt
    )

    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:5173'
    )
    const resetUrl = `${frontendUrl}/restablecer-password/${rawToken}`
    await this.mailService.sendPasswordResetEmail(user.email, resetUrl)

    return true
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput) {
    const user = await this.userService.findByValidResetToken(
      hashToken(resetPasswordInput.token)
    )
    if (!user) {
      throw new UnauthorizedException('Token inválido o caducado')
    }

    await this.userService.resetPassword(
      user._id,
      resetPasswordInput.newPassword
    )
    return true
  }
}

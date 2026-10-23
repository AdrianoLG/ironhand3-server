import { Response } from 'express'

import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { User } from '../user/entities/user.entity'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { Public } from './decorators/public.decorator'
import { ForgotPasswordInput } from './dto/forgot-password.input'
import { LoginInput } from './dto/login.input'
import { ResetPasswordInput } from './dto/reset-password.input'

const COOKIE_NAME = 'access_token'
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000 // 7 días

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context('res') res: Response
  ) {
    const user = await this.authService.validateUser(loginInput)
    const token = this.authService.signToken(user)
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_MAX_AGE
    })
    return user
  }

  @Public()
  @Mutation(() => Boolean)
  async logout(@Context('res') res: Response) {
    res.clearCookie(COOKIE_NAME)
    return true
  }

  @Query(() => User)
  me(@CurrentUser() user: User) {
    return user
  }

  @Public()
  @Mutation(() => Boolean)
  forgotPassword(
    @Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput
  ) {
    return this.authService.forgotPassword(forgotPasswordInput)
  }

  @Public()
  @Mutation(() => Boolean)
  resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput
  ) {
    return this.authService.resetPassword(resetPasswordInput)
  }
}

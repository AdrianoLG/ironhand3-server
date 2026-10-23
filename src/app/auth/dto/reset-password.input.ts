import { IsNotEmpty, MinLength } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  @IsNotEmpty()
  token: string

  @Field(() => String)
  @MinLength(8)
  newPassword: string
}

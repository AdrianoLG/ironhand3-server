import { IsOptional } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email of the user' })
  email: string

  @Field(() => String, { description: 'Password of the user' })
  password: string

  @Field(() => String, { description: 'Name of the user', nullable: true })
  @IsOptional()
  name?: string

  @Field(() => String, { description: 'City of the user', nullable: true })
  @IsOptional()
  city?: string
}

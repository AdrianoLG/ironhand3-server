import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Password of the user' })
  password: string
}

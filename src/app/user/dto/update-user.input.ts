import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateUserInput } from './create-user.input'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

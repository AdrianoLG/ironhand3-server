import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateAuthorInput } from './create-author.input'

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

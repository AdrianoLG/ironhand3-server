import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateBookInput } from './create-book.input'

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

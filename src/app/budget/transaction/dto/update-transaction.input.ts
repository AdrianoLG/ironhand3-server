import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateTransactionInput } from './create-transaction.input'

@InputType()
export class UpdateTransactionInput extends PartialType(
  CreateTransactionInput
) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

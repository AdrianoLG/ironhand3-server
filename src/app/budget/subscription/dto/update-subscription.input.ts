import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateSubscriptionInput } from './create-subscription.input'

@InputType()
export class UpdateSubscriptionInput extends PartialType(
  CreateSubscriptionInput
) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

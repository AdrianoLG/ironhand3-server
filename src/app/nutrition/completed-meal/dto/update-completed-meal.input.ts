import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateCompletedMealInput } from './create-completed-meal.input'

@InputType()
export class UpdateCompletedMealInput extends PartialType(
  CreateCompletedMealInput
) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

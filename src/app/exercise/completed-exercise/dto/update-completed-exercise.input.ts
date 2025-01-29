import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateCompletedExerciseInput } from './create-completed-exercise.input'

@InputType()
export class UpdateCompletedExerciseInput extends PartialType(
  CreateCompletedExerciseInput
) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateCompletedCleaningTaskInput } from './create-completed-cleaning-task.input'

@InputType()
export class UpdateCompletedCleaningTaskInput extends PartialType(
  CreateCompletedCleaningTaskInput
) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateCleaningTaskInput } from './create-cleaning-task.input'

@InputType()
export class UpdateCleaningTaskInput extends PartialType(
  CreateCleaningTaskInput
) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCompletedCleaningTaskInput {
  @Field(() => Date, { description: 'Completion date' })
  completedAt: Date

  @Field(() => String, { description: 'Cleaning task' })
  cleaningTask: MongoSchema.Types.ObjectId

  @Field(() => [String], { description: 'Rooms cleaned' })
  rooms?: MongoSchema.Types.ObjectId[]
}

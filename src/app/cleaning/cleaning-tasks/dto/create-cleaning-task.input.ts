import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCleaningTaskInput {
  @Field(() => String, { description: 'Cleaning task name' })
  name: string

  @Field(() => String, { description: 'Slug for the cleaning task' })
  slug: string

  @Field(() => String, { description: 'Image for the cleaning task' })
  img: string

  @Field(() => [String], { description: 'Possible rooms used' })
  possibleRooms?: MongoSchema.Types.ObjectId[]
}

import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class RehearsalSheetInput {
  @Field(() => String, { description: 'Sheet ID' })
  sheet: MongoSchema.Types.ObjectId

  @Field(() => Int, { description: 'Duration in minutes' })
  duration: number
}

@InputType()
export class CreateRehearsalInput {
  @Field(() => String, { description: 'Instrument ID' })
  instrument: string

  @Field(() => Date, { description: 'Completed at' })
  completedAt: Date

  @Field(() => [RehearsalSheetInput], { description: 'Sheets played' })
  sheets: RehearsalSheetInput[]
}

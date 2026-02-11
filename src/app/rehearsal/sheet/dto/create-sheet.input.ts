import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSheetInput {
  @Field(() => String, { description: 'Sheet title' })
  title: string

  @Field(() => String, { description: 'Artist name' })
  artist: string

  //possible instruments
  @Field(() => [String], { description: 'Possible instruments used' })
  possibleInstruments?: MongoSchema.Types.ObjectId[]
}

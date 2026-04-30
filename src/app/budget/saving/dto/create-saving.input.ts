import { Schema as MongoSchema } from 'mongoose'

import { Field, Float, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSavingInput {
  @Field(() => String, { description: 'Saving name' })
  name: string

  @Field(() => Float, { description: 'Current balance' })
  balance: number

  @Field(() => [String], { description: 'Saving goals', nullable: true })
  goals?: MongoSchema.Types.ObjectId[]
}

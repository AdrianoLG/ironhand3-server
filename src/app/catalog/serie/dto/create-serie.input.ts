import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateSerieInput {
  @Field(() => String, { description: 'Serie title' })
  title: string

  @Field(() => [String], { description: 'Serie directors ids' })
  director: MongoSchema.Types.ObjectId[]

  @Field(() => [String], { description: 'Serie actors ids', nullable: true })
  actors?: MongoSchema.Types.ObjectId[]

  @Field(() => String, { description: 'Country id', nullable: true })
  country?: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Serie cover', nullable: true })
  cover?: string

  @Field(() => Int, {
    description: 'Episode duration in minutes',
    nullable: true
  })
  episodeDuration?: number

  @Field(() => Int, { description: 'Release year', nullable: true })
  year?: number

  @Field(() => [String], { description: 'Genre ids', nullable: true })
  genres?: MongoSchema.Types.ObjectId[]

  @Field(() => [String], { description: 'Serie tags', nullable: true })
  tags?: string[]
}

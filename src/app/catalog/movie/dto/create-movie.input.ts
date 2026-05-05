import { Max, Min } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateMovieInput {
  @Field(() => String, { description: 'Movie title' })
  title: string

  @Field(() => [String], { description: 'Movie directors ids' })
  director: MongoSchema.Types.ObjectId[]

  @Field(() => [String], { description: 'Movie actors ids', nullable: true })
  actors?: MongoSchema.Types.ObjectId[]

  @Field(() => String, { description: 'Country id', nullable: true })
  country?: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Movie cover' })
  cover: string

  @Field(() => Int, { description: 'Duration in minutes', nullable: true })
  duration?: number

  @Field(() => Int, { description: 'Movie rating', nullable: true })
  @Min(0)
  @Max(9)
  rating?: number

  @Field(() => Int, { description: 'Release year', nullable: true })
  year?: number

  @Field(() => [String], { description: 'Genre ids', nullable: true })
  genres?: MongoSchema.Types.ObjectId[]

  @Field(() => [String], { description: 'Movie tags', nullable: true })
  tags?: string[]
}

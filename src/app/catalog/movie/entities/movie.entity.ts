import { Schema as MongoSchema } from 'mongoose'

import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Country } from '../../country/entities/country.entity'
import { Genre } from '../../genre/entities/genre.entity'
import { Person } from '../../person/entities/person.entity'

@ObjectType()
@Schema()
export class Movie {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Movie title' })
  @Prop({ required: true })
  title: string

  @Field(() => [Person], { description: 'Movie directors' })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Person', required: true })
  director: Person[]

  @Field(() => [Person], { description: 'Movie actors', nullable: true })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Person' })
  actors?: Person[]

  @Field(() => Country, { description: 'Movie country', nullable: true })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Country' })
  country?: Country

  @Field(() => String, { description: 'Movie cover' })
  @Prop({ required: true })
  cover: string

  @Field(() => Int, { description: 'Duration in minutes', nullable: true })
  @Prop()
  duration?: number

  @Field(() => Int, { description: 'Release year', nullable: true })
  @Prop()
  year?: number

  @Field(() => [Genre], { description: 'Movie genres', nullable: true })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Genre' })
  genres?: Genre[]

  @Field(() => [String], { description: 'Movie tags', nullable: true })
  @Prop({ type: [String] })
  tags?: string[]
}

export type MovieDocument = Movie & Document
export const MovieSchema = SchemaFactory.createForClass(Movie)

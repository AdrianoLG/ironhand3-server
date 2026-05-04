import { Schema as MongoSchema } from 'mongoose'

import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Country } from '../../country/entities/country.entity'
import { Genre } from '../../genre/entities/genre.entity'
import { Person } from '../../person/entities/person.entity'

@ObjectType()
@Schema()
export class Serie {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Serie title' })
  @Prop({ required: true })
  title: string

  @Field(() => [Person], { description: 'Serie directors' })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Person', required: true })
  director: Person[]

  @Field(() => [Person], { description: 'Serie actors', nullable: true })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Person' })
  actors?: Person[]

  @Field(() => Country, { description: 'Serie country', nullable: true })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Country' })
  country?: Country

  @Field(() => String, { description: 'Serie cover', nullable: true })
  @Prop()
  cover?: string

  @Field(() => Int, {
    description: 'Episode duration in minutes',
    nullable: true
  })
  @Prop()
  episodeDuration?: number

  @Field(() => Int, { description: 'Release year', nullable: true })
  @Prop()
  year?: number

  @Field(() => [Genre], { description: 'Serie genres', nullable: true })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Genre' })
  genres?: Genre[]

  @Field(() => [String], { description: 'Serie tags', nullable: true })
  @Prop({ type: [String] })
  tags?: string[]
}

export type SerieDocument = Serie & Document
export const SerieSchema = SchemaFactory.createForClass(Serie)

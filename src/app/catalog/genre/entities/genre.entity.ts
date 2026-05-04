import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class Genre {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Genre name' })
  @Prop({ required: true })
  name: string

  @Field(() => String, { description: 'Genre slug' })
  @Prop({ required: true, unique: true })
  slug: string
}

export type GenreDocument = Genre & Document
export const GenreSchema = SchemaFactory.createForClass(Genre)

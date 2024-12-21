import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class Header {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Title of nav item' })
  @Prop({ required: true, unique: true })
  title: string

  @Field(() => String, { description: 'URL of nav item' })
  @Prop({ required: true, unique: true })
  url: string
}

export type HeaderDocument = Header & Document
export const HeaderSchema = SchemaFactory.createForClass(Header)

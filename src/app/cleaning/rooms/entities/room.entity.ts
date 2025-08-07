import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class Room {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Room name' })
  @Prop({ required: true })
  name: string

  @Field(() => String, { description: 'Room slug' })
  @Prop({ required: true })
  slug: string

  @Field(() => String, { description: 'Room image' })
  @Prop({ required: true })
  image: string
}

export type RoomDocument = Room & Document
export const RoomSchema = SchemaFactory.createForClass(Room)

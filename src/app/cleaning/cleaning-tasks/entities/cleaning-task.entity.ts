import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Room } from '../../rooms/entities/room.entity'

@ObjectType()
@Schema()
export class CleaningTask {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Cleaning task name' })
  @Prop({ required: true })
  name: string

  @Field(() => String, { description: 'Slug for the cleaning task' })
  @Prop({ required: true })
  slug: string

  @Field(() => String, { description: 'Image for the cleaning task' })
  @Prop({ required: true })
  img: string

  @Field(() => [Room], { description: 'Possible rooms used' })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Room', required: true })
  possibleRooms?: Room[]
}

export type CleaningTaskDocument = CleaningTask & Document
export const CleaningTaskSchema = SchemaFactory.createForClass(CleaningTask)

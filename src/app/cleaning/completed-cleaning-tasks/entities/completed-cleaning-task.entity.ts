import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { CleaningTask } from '../../cleaning-tasks/entities/cleaning-task.entity'
import { Room } from '../../rooms/entities/room.entity'

@ObjectType()
@Schema()
export class CompletedCleaningTask {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => Date, { description: 'Completion date' })
  @Prop({ required: true })
  completedAt: Date

  @Field(() => CleaningTask, { description: 'Cleaning task' })
  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'CleaningTask',
    required: true
  })
  cleaningTask: string

  @Field(() => [Room], { description: 'Rooms cleaned' })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Room', required: true })
  rooms?: string[]
}

export type CompletedCleaningTaskDocument = CompletedCleaningTask & Document
export const CompletedCleaningTaskSchema = SchemaFactory.createForClass(
  CompletedCleaningTask
)

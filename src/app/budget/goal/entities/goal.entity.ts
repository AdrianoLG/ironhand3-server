import { Schema as MongoSchema } from 'mongoose';

import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Goal {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Goal title' })
  @Prop({ required: true })
  title: string

  @Field(() => Float, { description: 'Target amount' })
  @Prop({ required: true })
  targetAmount: number

  @Field(() => Boolean, { description: 'Whether the goal is completed' })
  @Prop({ default: false })
  isCompleted: boolean

  @Field(() => Date, {
    description: 'Completion date',
    nullable: true
  })
  @Prop()
  completedAt?: Date
}

export type GoalDocument = Goal & Document
export const GoalSchema = SchemaFactory.createForClass(Goal)

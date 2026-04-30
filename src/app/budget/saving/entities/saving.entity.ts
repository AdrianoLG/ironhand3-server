import { Schema as MongoSchema } from 'mongoose'

import { Field, Float, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Goal } from '../../goal/entities/goal.entity'

@ObjectType()
@Schema()
export class Saving {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Saving name' })
  @Prop({ required: true })
  name: string

  @Field(() => Float, { description: 'Current balance' })
  @Prop({ required: true })
  balance: number

  @Field(() => [Goal], { description: 'Saving goals' })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Goal', default: [] })
  goals: Goal[]
}

export type SavingDocument = Saving & Document
export const SavingSchema = SchemaFactory.createForClass(Saving)

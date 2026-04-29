import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Food } from '../../food/entities/food.entity'

export enum CompletedMealTimeOfDay {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  SNACK = 'snack',
  DINNER = 'dinner'
}

registerEnumType(CompletedMealTimeOfDay, {
  name: 'CompletedMealTimeOfDay'
})

@ObjectType()
@Schema()
export class CompletedMeal {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => Food, { description: 'Food' })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Food', required: true })
  food: Food | MongoSchema.Types.ObjectId

  @Field(() => CompletedMealTimeOfDay, { description: 'Time of day' })
  @Prop({ required: true, enum: Object.values(CompletedMealTimeOfDay) })
  timeOfDay: CompletedMealTimeOfDay

  @Field(() => Number, { description: 'Quantity', nullable: true })
  @Prop()
  qty?: number

  @Field(() => String, { description: 'Unit', nullable: true })
  @Prop()
  unit?: string

  @Field(() => Date, { description: 'Created date' })
  @Prop({ required: true })
  created: Date
}

export type CompletedMealDocument = CompletedMeal & Document
export const CompletedMealSchema = SchemaFactory.createForClass(CompletedMeal)

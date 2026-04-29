import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType } from '@nestjs/graphql'

import { CompletedMealTimeOfDay } from '../entities/completed-meal.entity'

@InputType()
export class CreateCompletedMealInput {
  @Field(() => String, { description: 'Food id' })
  food: MongoSchema.Types.ObjectId

  @Field(() => CompletedMealTimeOfDay, { description: 'Time of day' })
  timeOfDay: CompletedMealTimeOfDay

  @Field(() => Number, { description: 'Quantity', nullable: true })
  qty?: number

  @Field(() => String, { description: 'Unit', nullable: true })
  unit?: string

  @Field(() => Date, { description: 'Created date' })
  created: Date
}

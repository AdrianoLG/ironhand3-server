import { Field, InputType } from '@nestjs/graphql'

import { FoodTimeOfDay } from '../entities/food.entity'

@InputType()
export class CreateFoodInput {
  @Field(() => String, { description: 'Food name' })
  name: string

  @Field(() => FoodTimeOfDay, { description: 'Time of day' })
  timeOfDay: FoodTimeOfDay

  @Field(() => Number, { description: 'Kcal', nullable: true })
  kcal?: number

  @Field(() => Number, { description: 'Fats', nullable: true })
  fats?: number

  @Field(() => Number, { description: 'Carbs', nullable: true })
  carbs?: number

  @Field(() => Number, { description: 'Proteins', nullable: true })
  proteins?: number

  @Field(() => Number, { description: 'Quantity', nullable: true })
  qty?: number

  @Field(() => String, { description: 'Unit', nullable: true })
  unit?: string

  @Field(() => Date, { description: 'Created date' })
  created: Date
}

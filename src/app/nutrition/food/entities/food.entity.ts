import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum FoodTimeOfDay {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  SNACK = 'snack',
  DINNER = 'dinner'
}

registerEnumType(FoodTimeOfDay, {
  name: 'FoodTimeOfDay'
})

@ObjectType()
@Schema()
export class Food {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Food name' })
  @Prop({ required: true })
  name: string

  @Field(() => FoodTimeOfDay, { description: 'Time of day' })
  @Prop({ required: true, enum: Object.values(FoodTimeOfDay) })
  timeOfDay: FoodTimeOfDay

  @Field(() => Number, { description: 'Kcal', nullable: true })
  @Prop()
  kcal?: number

  @Field(() => Number, { description: 'Fats', nullable: true })
  @Prop()
  fats?: number

  @Field(() => Number, { description: 'Carbs', nullable: true })
  @Prop()
  carbs?: number

  @Field(() => Number, { description: 'Proteins', nullable: true })
  @Prop()
  proteins?: number

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

export type FoodDocument = Food & Document
export const FoodSchema = SchemaFactory.createForClass(Food)

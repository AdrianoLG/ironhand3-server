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
}

export type FoodDocument = Food & Document
export const FoodSchema = SchemaFactory.createForClass(Food)

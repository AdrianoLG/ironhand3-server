import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum RecipeMachine {
  MAMBO = 'mambo',
  TAURUS = 'taurus',
  OVEN = 'oven',
  MICROWAVE = 'microwave',
  MIXER = 'mixer',
  GRINDER = 'grinder'
}

registerEnumType(RecipeMachine, {
  name: 'RecipeMachine'
})

@ObjectType()
export class RecipeIngredient {
  @Field(() => String, { description: 'Ingredient name' })
  name: string

  @Field(() => String, { description: 'Ingredient image' })
  image: string

  @Field(() => Number, { description: 'Quantity', nullable: true })
  qty?: number

  @Field(() => String, { description: 'Unit', nullable: true })
  unit?: string
}

@ObjectType()
@Schema()
export class Recipe {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Recipe name' })
  @Prop({ required: true })
  name: string

  @Field(() => [RecipeIngredient], { description: 'Ingredients' })
  @Prop({
    type: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        qty: { type: Number, required: false },
        unit: { type: String, required: false }
      }
    ],
    required: true,
    default: []
  })
  ingredients: RecipeIngredient[]

  @Field(() => [String], { description: 'Preparation steps' })
  @Prop({ type: [String], required: true, default: [] })
  steps: string[]

  @Field(() => [String], { description: 'Gallery images' })
  @Prop({ type: [String], required: true, default: [] })
  gallery: string[]

  @Field(() => RecipeMachine, { description: 'Machine', nullable: true })
  @Prop({ enum: Object.values(RecipeMachine) })
  machine?: RecipeMachine
}

export type RecipeDocument = Recipe & Document
export const RecipeSchema = SchemaFactory.createForClass(Recipe)

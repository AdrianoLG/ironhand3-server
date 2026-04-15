import { Field, InputType } from '@nestjs/graphql'

import { RecipeMachine } from '../entities/recipe.entity'

@InputType()
export class RecipeIngredientInput {
  @Field(() => String, { description: 'Ingredient name' })
  name: string

  @Field(() => String, { description: 'Ingredient image' })
  image: string

  @Field(() => Number, { description: 'Quantity', nullable: true })
  qty?: number

  @Field(() => String, { description: 'Unit', nullable: true })
  unit?: string
}

@InputType()
export class CreateRecipeInput {
  @Field(() => String, { description: 'Recipe name' })
  name: string

  @Field(() => [RecipeIngredientInput], { description: 'Ingredients' })
  ingredients: RecipeIngredientInput[]

  @Field(() => [String], { description: 'Preparation steps' })
  steps: string[]

  @Field(() => [String], { description: 'Gallery images' })
  gallery: string[]

  @Field(() => RecipeMachine, { description: 'Machine', nullable: true })
  machine?: RecipeMachine
}

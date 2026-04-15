import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateIngredientInput } from './dto/create-ingredient.input'
import { UpdateIngredientInput } from './dto/update-ingredient.input'
import { Ingredient } from './entities/ingredient.entity'
import { IngredientService } from './ingredient.service'

@Resolver(() => Ingredient)
export class IngredientResolver {
  constructor(private readonly ingredientService: IngredientService) {}

  @Mutation(() => Ingredient)
  createIngredient(
    @Args('createIngredientInput') createIngredientInput: CreateIngredientInput
  ) {
    return this.ingredientService.createIngredient(createIngredientInput)
  }

  @Query(() => [Ingredient], { name: 'ingredients' })
  ingredients() {
    return this.ingredientService.findAllIngredients()
  }

  @Query(() => Ingredient, { name: 'ingredient' })
  ingredient(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.ingredientService.getIngredientById(id)
  }

  @Mutation(() => Ingredient)
  updateIngredient(
    @Args('updateIngredientInput') updateIngredientInput: UpdateIngredientInput
  ) {
    return this.ingredientService.updateIngredient(
      updateIngredientInput._id,
      updateIngredientInput
    )
  }

  @Mutation(() => Ingredient)
  removeIngredient(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.ingredientService.removeIngredient(id)
  }
}

import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateRecipeInput } from './dto/create-recipe.input'
import { UpdateRecipeInput } from './dto/update-recipe.input'
import { Recipe } from './entities/recipe.entity'
import { RecipeService } from './recipe.service'

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Mutation(() => Recipe)
  createRecipe(
    @Args('createRecipeInput') createRecipeInput: CreateRecipeInput
  ) {
    return this.recipeService.createRecipe(createRecipeInput)
  }

  @Query(() => [Recipe], { name: 'recipes' })
  recipes() {
    return this.recipeService.findAllRecipes()
  }

  @Query(() => Recipe, { name: 'recipe' })
  recipe(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.recipeService.getRecipeById(id)
  }

  @Mutation(() => Recipe)
  updateRecipe(
    @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput
  ) {
    return this.recipeService.updateRecipe(
      updateRecipeInput._id,
      updateRecipeInput
    )
  }

  @Mutation(() => Recipe)
  removeRecipe(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.recipeService.removeRecipe(id)
  }
}

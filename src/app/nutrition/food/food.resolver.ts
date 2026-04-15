import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateFoodInput } from './dto/create-food.input'
import { UpdateFoodInput } from './dto/update-food.input'
import { Food } from './entities/food.entity'
import { FoodService } from './food.service'

@Resolver(() => Food)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  @Mutation(() => Food)
  createFood(@Args('createFoodInput') createFoodInput: CreateFoodInput) {
    return this.foodService.createFood(createFoodInput)
  }

  @Query(() => [Food], { name: 'foods' })
  foods() {
    return this.foodService.findAllFoods()
  }

  @Query(() => Food, { name: 'food' })
  food(@Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId) {
    return this.foodService.getFoodById(id)
  }

  @Mutation(() => Food)
  updateFood(@Args('updateFoodInput') updateFoodInput: UpdateFoodInput) {
    return this.foodService.updateFood(updateFoodInput._id, updateFoodInput)
  }

  @Mutation(() => Food)
  removeFood(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.foodService.removeFood(id)
  }
}

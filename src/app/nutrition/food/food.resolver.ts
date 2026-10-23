import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CreateFoodInput } from './dto/create-food.input'
import { UpdateFoodInput } from './dto/update-food.input'
import { Food } from './entities/food.entity'
import { FoodService } from './food.service'

@Resolver(() => Food)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  @Mutation(() => Food)
  createFood(
    @Args('createFoodInput') createFoodInput: CreateFoodInput,
    @CurrentUser() currentUser: User
  ) {
    return this.foodService.createFood(createFoodInput, currentUser)
  }

  @Query(() => [Food], { name: 'foods' })
  foods(@CurrentUser() currentUser: User) {
    return this.foodService.findAllFoods(currentUser)
  }

  @Query(() => Food, { name: 'food' })
  food(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.foodService.getFoodById(id, currentUser)
  }

  @Mutation(() => Food)
  updateFood(
    @Args('updateFoodInput') updateFoodInput: UpdateFoodInput,
    @CurrentUser() currentUser: User
  ) {
    return this.foodService.updateFood(
      updateFoodInput._id,
      updateFoodInput,
      currentUser
    )
  }

  @Mutation(() => Food)
  removeFood(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.foodService.removeFood(id, currentUser)
  }
}

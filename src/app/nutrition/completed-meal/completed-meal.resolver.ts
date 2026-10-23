import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CompletedMealService } from './completed-meal.service'
import { CreateCompletedMealInput } from './dto/create-completed-meal.input'
import { UpdateCompletedMealInput } from './dto/update-completed-meal.input'
import { CompletedMeal } from './entities/completed-meal.entity'

@Resolver(() => CompletedMeal)
export class CompletedMealResolver {
  constructor(private readonly completedMealService: CompletedMealService) {}

  @Mutation(() => CompletedMeal)
  createCompletedMeal(
    @Args('createCompletedMealInput')
    createCompletedMealInput: CreateCompletedMealInput,
    @CurrentUser() currentUser: User
  ) {
    return this.completedMealService.createCompletedMeal(
      createCompletedMealInput,
      currentUser
    )
  }

  @Query(() => [CompletedMeal], { name: 'completedMeals' })
  completedMeals(@CurrentUser() currentUser: User) {
    return this.completedMealService.findAllCompletedMeals(currentUser)
  }

  @Query(() => CompletedMeal, { name: 'completedMeal' })
  completedMeal(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.completedMealService.getCompletedMealById(id, currentUser)
  }

  @Mutation(() => CompletedMeal)
  updateCompletedMeal(
    @Args('updateCompletedMealInput')
    updateCompletedMealInput: UpdateCompletedMealInput,
    @CurrentUser() currentUser: User
  ) {
    return this.completedMealService.updateCompletedMeal(
      updateCompletedMealInput._id,
      updateCompletedMealInput,
      currentUser
    )
  }

  @Mutation(() => CompletedMeal)
  removeCompletedMeal(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.completedMealService.removeCompletedMeal(id, currentUser)
  }
}

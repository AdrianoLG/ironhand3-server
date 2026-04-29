import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

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
    createCompletedMealInput: CreateCompletedMealInput
  ) {
    return this.completedMealService.createCompletedMeal(
      createCompletedMealInput
    )
  }

  @Query(() => [CompletedMeal], { name: 'completedMeals' })
  completedMeals() {
    return this.completedMealService.findAllCompletedMeals()
  }

  @Query(() => CompletedMeal, { name: 'completedMeal' })
  completedMeal(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.completedMealService.getCompletedMealById(id)
  }

  @Mutation(() => CompletedMeal)
  updateCompletedMeal(
    @Args('updateCompletedMealInput')
    updateCompletedMealInput: UpdateCompletedMealInput
  ) {
    return this.completedMealService.updateCompletedMeal(
      updateCompletedMealInput._id,
      updateCompletedMealInput
    )
  }

  @Mutation(() => CompletedMeal)
  removeCompletedMeal(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.completedMealService.removeCompletedMeal(id)
  }
}

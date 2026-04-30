import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateGoalInput } from './dto/create-goal.input'
import { UpdateGoalInput } from './dto/update-goal.input'
import { Goal } from './entities/goal.entity'
import { GoalService } from './goal.service'

@Resolver(() => Goal)
export class GoalResolver {
  constructor(private readonly goalService: GoalService) {}

  @Mutation(() => Goal)
  createGoal(@Args('createGoalInput') createGoalInput: CreateGoalInput) {
    return this.goalService.createGoal(createGoalInput)
  }

  @Query(() => [Goal], { name: 'goals' })
  findAll() {
    return this.goalService.findAllGoals()
  }

  @Query(() => Goal, { name: 'goal' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.goalService.getGoalById(id)
  }

  @Mutation(() => Goal)
  updateGoal(@Args('updateGoalInput') updateGoalInput: UpdateGoalInput) {
    return this.goalService.updateGoal(updateGoalInput._id, updateGoalInput)
  }

  @Mutation(() => Goal)
  removeGoal(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.goalService.removeGoal(id)
  }
}

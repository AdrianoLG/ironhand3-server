import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CreateGoalInput } from './dto/create-goal.input'
import { UpdateGoalInput } from './dto/update-goal.input'
import { Goal } from './entities/goal.entity'
import { GoalService } from './goal.service'

@Resolver(() => Goal)
export class GoalResolver {
  constructor(private readonly goalService: GoalService) {}

  @Mutation(() => Goal)
  createGoal(
    @Args('createGoalInput') createGoalInput: CreateGoalInput,
    @CurrentUser() currentUser: User
  ) {
    return this.goalService.createGoal(createGoalInput, currentUser)
  }

  @Query(() => [Goal], { name: 'goals' })
  findAll(@CurrentUser() currentUser: User) {
    return this.goalService.findAllGoals(currentUser)
  }

  @Query(() => Goal, { name: 'goal' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.goalService.getGoalById(id, currentUser)
  }

  @Mutation(() => Goal)
  updateGoal(
    @Args('updateGoalInput') updateGoalInput: UpdateGoalInput,
    @CurrentUser() currentUser: User
  ) {
    return this.goalService.updateGoal(
      updateGoalInput._id,
      updateGoalInput,
      currentUser
    )
  }

  @Mutation(() => Goal)
  removeGoal(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.goalService.removeGoal(id, currentUser)
  }
}

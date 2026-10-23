import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CompletedExerciseService } from './completed-exercise.service'
import { CreateCompletedExerciseInput } from './dto/create-completed-exercise.input'
import { UpdateCompletedExerciseInput } from './dto/update-completed-exercise.input'
import { CompletedExercise } from './entities/completed-exercise.entity'

@Resolver(() => CompletedExercise)
export class CompletedExerciseResolver {
  constructor(
    private readonly completedExerciseService: CompletedExerciseService
  ) {}

  @Mutation(() => CompletedExercise)
  createCompletedExercise(
    @Args('createCompletedExerciseInput')
    createCompletedExerciseInput: CreateCompletedExerciseInput,
    @CurrentUser() currentUser: User
  ) {
    return this.completedExerciseService.createCompletedExercise(
      createCompletedExerciseInput,
      currentUser
    )
  }

  @Query(() => [CompletedExercise], { name: 'completedExercises' })
  findAll(@CurrentUser() currentUser: User) {
    return this.completedExerciseService.findAllCompletedExercises(currentUser)
  }

  @Query(() => CompletedExercise, { name: 'completedExercise' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.completedExerciseService.getCompletedExerciseById(
      id,
      currentUser
    )
  }

  @Mutation(() => CompletedExercise)
  updateCompletedExercise(
    @Args('updateCompletedExerciseInput')
    updateCompletedExerciseInput: UpdateCompletedExerciseInput,
    @CurrentUser() currentUser: User
  ) {
    return this.completedExerciseService.updateCompletedExercise(
      updateCompletedExerciseInput._id,
      updateCompletedExerciseInput,
      currentUser
    )
  }

  @Mutation(() => CompletedExercise)
  removeCompletedExercise(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.completedExerciseService.removeCompletedExercise(
      id,
      currentUser
    )
  }
}

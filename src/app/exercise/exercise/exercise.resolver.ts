import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CreateExerciseInput } from './dto/create-exercise.input'
import { UpdateExerciseInput } from './dto/update-exercise.input'
import { Exercise } from './entities/exercise.entity'
import { ExerciseService } from './exercise.service'

@Resolver(() => Exercise)
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Mutation(() => Exercise)
  createExercise(
    @Args('createExerciseInput') createExerciseInput: CreateExerciseInput,
    @CurrentUser() currentUser: User
  ) {
    return this.exerciseService.createExercise(createExerciseInput, currentUser)
  }

  @Query(() => [Exercise], { name: 'exercises' })
  findAll(@CurrentUser() currentUser: User) {
    return this.exerciseService.findAllExercises(currentUser)
  }

  @Query(() => Exercise, { name: 'exercise' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.exerciseService.getExerciseById(id, currentUser)
  }

  @Mutation(() => Exercise)
  updateExercise(
    @Args('updateExerciseInput') updateExerciseInput: UpdateExerciseInput,
    @CurrentUser() currentUser: User
  ) {
    return this.exerciseService.updateExercise(
      updateExerciseInput._id,
      updateExerciseInput,
      currentUser
    )
  }

  @Mutation(() => Exercise)
  removeExercise(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.exerciseService.removeExercise(id, currentUser)
  }
}

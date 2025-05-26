import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateExerciseInput } from './dto/create-exercise.input'
import { UpdateExerciseInput } from './dto/update-exercise.input'
import { Exercise } from './entities/exercise.entity'
import { ExerciseService } from './exercise.service'

@Resolver(() => Exercise)
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Mutation(() => Exercise)
  createExercise(
    @Args('createExerciseInput') createExerciseInput: CreateExerciseInput
  ) {
    return this.exerciseService.createExercise(createExerciseInput)
  }

  @Query(() => [Exercise], { name: 'exercises' })
  findAll() {
    return this.exerciseService.findAllExercises()
  }

  @Query(() => Exercise, { name: 'exercise' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.exerciseService.getExerciseById(id)
  }

  @Mutation(() => Exercise)
  updateExercise(
    @Args('updateExerciseInput') updateExerciseInput: UpdateExerciseInput
  ) {
    return this.exerciseService.updateExercise(
      updateExerciseInput._id,
      updateExerciseInput
    )
  }

  @Mutation(() => Exercise)
  removeExercise(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.exerciseService.removeExercise(id)
  }
}

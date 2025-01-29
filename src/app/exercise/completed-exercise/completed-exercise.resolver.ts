import { Schema as MongooseSchema } from 'mongoose'

import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

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
    createCompletedExerciseInput: CreateCompletedExerciseInput
  ) {
    return this.completedExerciseService.createCompletedExercise(
      createCompletedExerciseInput
    )
  }

  @Query(() => [CompletedExercise], { name: 'completedExercises' })
  findAll() {
    return this.completedExerciseService.findAllCompletedExercises()
  }

  @Query(() => CompletedExercise, { name: 'completedExercise' })
  findOne(@Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId) {
    return this.completedExerciseService.getCompletedExerciseById(id)
  }

  @Mutation(() => CompletedExercise)
  updateCompletedExercise(
    @Args('updateCompletedExerciseInput')
    updateCompletedExerciseInput: UpdateCompletedExerciseInput
  ) {
    return this.completedExerciseService.updateCompletedExercise(
      updateCompletedExerciseInput._id,
      updateCompletedExerciseInput
    )
  }

  @Mutation(() => CompletedExercise)
  removeCompletedExercise(
    @Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.completedExerciseService.removeCompletedExercise(id)
  }
}

import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CompletedCleaningTasksService } from './completed-cleaning-tasks.service'
import { CreateCompletedCleaningTaskInput } from './dto/create-completed-cleaning-task.input'
import { UpdateCompletedCleaningTaskInput } from './dto/update-completed-cleaning-task.input'
import { CompletedCleaningTask } from './entities/completed-cleaning-task.entity'

@Resolver(() => CompletedCleaningTask)
export class CompletedCleaningTasksResolver {
  constructor(
    private readonly completedCleaningTasksService: CompletedCleaningTasksService
  ) {}

  @Mutation(() => CompletedCleaningTask)
  createCompletedCleaningTask(
    @Args('createCompletedCleaningTaskInput')
    createCompletedCleaningTaskInput: CreateCompletedCleaningTaskInput
  ) {
    return this.completedCleaningTasksService.createCompletedCleaningTask(
      createCompletedCleaningTaskInput
    )
  }

  @Query(() => [CompletedCleaningTask], { name: 'completedCleaningTasks' })
  findAll() {
    return this.completedCleaningTasksService.findAllCompletedCleaningTasks()
  }

  @Query(() => CompletedCleaningTask, { name: 'completedCleaningTask' })
  getCompletedCleaningTaskById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.completedCleaningTasksService.getCompletedCleaningTaskById(id)
  }

  @Mutation(() => CompletedCleaningTask)
  updateCompletedCleaningTask(
    @Args('updateCompletedCleaningTaskInput')
    updateCompletedCleaningTaskInput: UpdateCompletedCleaningTaskInput
  ) {
    return this.completedCleaningTasksService.updateCompletedCleaningTask(
      updateCompletedCleaningTaskInput._id,
      updateCompletedCleaningTaskInput
    )
  }

  @Mutation(() => CompletedCleaningTask)
  removeCompletedCleaningTask(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.completedCleaningTasksService.removeCompletedCleaningTask(id)
  }
}

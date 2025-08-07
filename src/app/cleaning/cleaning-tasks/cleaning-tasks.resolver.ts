import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CleaningTasksService } from './cleaning-tasks.service'
import { CreateCleaningTaskInput } from './dto/create-cleaning-task.input'
import { UpdateCleaningTaskInput } from './dto/update-cleaning-task.input'
import { CleaningTask } from './entities/cleaning-task.entity'

@Resolver(() => CleaningTask)
export class CleaningTasksResolver {
  constructor(private readonly cleaningTasksService: CleaningTasksService) {}

  @Mutation(() => CleaningTask)
  createCleaningTask(
    @Args('createCleaningTaskInput')
    createCleaningTaskInput: CreateCleaningTaskInput
  ) {
    return this.cleaningTasksService.createCleaningTask(createCleaningTaskInput)
  }

  @Query(() => [CleaningTask], { name: 'cleaningTasks' })
  findAll() {
    return this.cleaningTasksService.findAllCleaningTasks()
  }

  @Query(() => CleaningTask, { name: 'cleaningTask' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.cleaningTasksService.getCleaningTaskById(id)
  }

  @Mutation(() => CleaningTask)
  updateCleaningTask(
    @Args('updateCleaningTaskInput')
    updateCleaningTaskInput: UpdateCleaningTaskInput
  ) {
    return this.cleaningTasksService.updateCleaningTask(
      updateCleaningTaskInput._id,
      updateCleaningTaskInput
    )
  }

  @Mutation(() => CleaningTask)
  removeCleaningTask(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.cleaningTasksService.removeCleaningTask(id)
  }
}

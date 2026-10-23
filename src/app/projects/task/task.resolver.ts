import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CreateTaskInput } from './dto/create-task.input'
import { UpdateTaskInput } from './dto/update-task.input'
import { Task } from './entities/task.entity'
import { TaskService } from './task.service'

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @CurrentUser() currentUser: User
  ) {
    return this.taskService.createTask(createTaskInput, currentUser)
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll(@CurrentUser() currentUser: User) {
    return this.taskService.findAllTasks(currentUser)
  }

  @Query(() => Task, { name: 'task' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.taskService.getTaskById(id, currentUser)
  }

  @Mutation(() => Task)
  updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
    @CurrentUser() currentUser: User
  ) {
    return this.taskService.updateTask(
      updateTaskInput._id,
      updateTaskInput,
      currentUser
    )
  }

  @Mutation(() => Task)
  removeTask(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.taskService.removeTask(id, currentUser)
  }
}

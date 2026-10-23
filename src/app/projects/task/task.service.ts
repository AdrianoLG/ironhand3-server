import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwnerUnlessShared } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { Project, ProjectDocument } from '../project/entities/project.entity'
import { CreateTaskInput } from './dto/create-task.input'
import { UpdateTaskInput } from './dto/update-task.input'
import { Task, TaskDocument } from './entities/task.entity'

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>
  ) {}

  async createTask(createTaskInput: CreateTaskInput, currentUser: User) {
    const project = await this.projectModel
      .findById(createTaskInput.project)
      .exec()

    if (!project) {
      throw new Error(`Project with id ${createTaskInput.project} not found`)
    }
    assertOwnerUnlessShared(project, currentUser)

    const createdTask = new this.taskModel(createTaskInput)
    const savedTask = await createdTask.save()

    await this.projectModel
      .findByIdAndUpdate(
        createTaskInput.project,
        { $addToSet: { tasks: savedTask._id } },
        { new: true }
      )
      .exec()

    return savedTask
  }

  async findAllTasks(currentUser: User) {
    const visibleProjectIds = await this.projectModel
      .find({ $or: [{ owner: currentUser._id }, { shared: true }] })
      .distinct('_id')
      .exec()

    return this.taskModel
      .find({ project: { $in: visibleProjectIds } })
      .populate('asignedTo')
      .populate('project')
      .exec()
  }

  async getTaskById(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const task = await this.taskModel.findById(id).exec()
    if (!task) return null

    const project = await this.projectModel.findById(task.project).exec()
    if (project) assertOwnerUnlessShared(project, currentUser)

    return task.populate(['asignedTo', 'project'])
  }

  async updateTask(
    id: MongooseSchema.Types.ObjectId,
    updateTaskInput: UpdateTaskInput,
    currentUser: User
  ) {
    const existingTask = await this.taskModel.findById(id).exec()

    if (!existingTask) {
      return null
    }

    const currentProject = await this.projectModel
      .findById(existingTask.project)
      .exec()
    if (currentProject) assertOwnerUnlessShared(currentProject, currentUser)

    if (updateTaskInput.project) {
      const targetProject = await this.projectModel
        .findById(updateTaskInput.project)
        .exec()

      if (!targetProject) {
        throw new Error(`Project with id ${updateTaskInput.project} not found`)
      }
      assertOwnerUnlessShared(targetProject, currentUser)
    }

    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskInput, { new: true })
      .populate('asignedTo')
      .populate('project')
      .exec()

    if (!updatedTask) {
      return null
    }

    if (
      updateTaskInput.project &&
      existingTask.project?.toString() !== updateTaskInput.project.toString()
    ) {
      await this.projectModel
        .findByIdAndUpdate(existingTask.project, { $pull: { tasks: id } })
        .exec()

      await this.projectModel
        .findByIdAndUpdate(updateTaskInput.project, {
          $addToSet: { tasks: id }
        })
        .exec()
    }

    return updatedTask
  }

  async removeTask(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const existingTask = await this.taskModel.findById(id).exec()
    if (!existingTask) return null

    const project = await this.projectModel
      .findById(existingTask.project)
      .exec()
    if (project) assertOwnerUnlessShared(project, currentUser)

    const removedTask = await this.taskModel.findByIdAndDelete(id).exec()

    if (removedTask) {
      await this.projectModel
        .findByIdAndUpdate(removedTask.project, { $pull: { tasks: id } })
        .exec()

      await this.projectModel
        .updateMany({ tasks: id }, { $pull: { tasks: id } })
        .exec()
    }

    return removedTask
  }
}

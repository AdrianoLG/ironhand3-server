import { Model, Schema as MongooseSchema } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Project, ProjectDocument } from '../project/entities/project.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task, TaskDocument } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>
  ) {}

  async createTask(createTaskInput: CreateTaskInput) {
    const project = await this.projectModel
      .findById(createTaskInput.project)
      .exec()

    if (!project) {
      throw new Error(`Project with id ${createTaskInput.project} not found`)
    }

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

  async findAllTasks() {
    return this.taskModel
      .find()
      .populate('asignedTo')
      .populate('project')
      .exec()
  }

  async getTaskById(id: MongooseSchema.Types.ObjectId) {
    return this.taskModel
      .findById(id)
      .populate('asignedTo')
      .populate('project')
      .exec()
  }

  async updateTask(
    id: MongooseSchema.Types.ObjectId,
    updateTaskInput: UpdateTaskInput
  ) {
    const existingTask = await this.taskModel.findById(id).exec()

    if (!existingTask) {
      return null
    }

    if (updateTaskInput.project) {
      const targetProject = await this.projectModel
        .findById(updateTaskInput.project)
        .exec()

      if (!targetProject) {
        throw new Error(`Project with id ${updateTaskInput.project} not found`)
      }
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

  async removeTask(id: MongooseSchema.Types.ObjectId) {
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

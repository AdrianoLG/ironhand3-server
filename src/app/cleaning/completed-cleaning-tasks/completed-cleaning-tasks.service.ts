import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { User } from '../../user/entities/user.entity'
import { CreateCompletedCleaningTaskInput } from './dto/create-completed-cleaning-task.input'
import { UpdateCompletedCleaningTaskInput } from './dto/update-completed-cleaning-task.input'
import { CompletedCleaningTask } from './entities/completed-cleaning-task.entity'

@Injectable()
export class CompletedCleaningTasksService {
  constructor(
    @InjectModel(CompletedCleaningTask.name)
    private completedCleaningTaskModel: Model<CompletedCleaningTask>
  ) {}

  async createCompletedCleaningTask(
    createCompletedCleaningTaskInput: CreateCompletedCleaningTaskInput,
    completedBy: User
  ) {
    const createdCompletedCleaningTask = new this.completedCleaningTaskModel({
      ...createCompletedCleaningTaskInput,
      completedBy: completedBy._id
    })
    await createdCompletedCleaningTask.save()
    return createdCompletedCleaningTask.populate([
      'rooms',
      'cleaningTask',
      'completedBy'
    ])
  }

  async findAllCompletedCleaningTasks() {
    return this.completedCleaningTaskModel
      .find()
      .sort({ date: -1 })
      .populate('rooms')
      .populate('cleaningTask')
      .populate('completedBy')
      .exec()
  }

  async getCompletedCleaningTaskById(id: MongooseSchema.Types.ObjectId) {
    return this.completedCleaningTaskModel
      .findById(id)
      .populate('rooms')
      .populate('cleaningTask')
      .populate('completedBy')
      .exec()
  }

  async updateCompletedCleaningTask(
    id: MongooseSchema.Types.ObjectId,
    updateCompletedCleaningTaskInput: UpdateCompletedCleaningTaskInput
  ) {
    const updatedTask = await this.completedCleaningTaskModel
      .findByIdAndUpdate(id, updateCompletedCleaningTaskInput, {
        new: true
      })
      .populate('rooms')
      .populate('cleaningTask')
      .populate('completedBy')
      .exec()
    if (!updatedTask) {
      throw new Error(`Completed Cleaning Task with id ${id} not found`)
    }
    return updatedTask
  }

  async removeCompletedCleaningTask(id: MongooseSchema.Types.ObjectId) {
    return this.completedCleaningTaskModel.findByIdAndDelete(id).exec()
  }
}

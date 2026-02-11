import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

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
    createCompletedCleaningTaskInput: CreateCompletedCleaningTaskInput
  ) {
    const createdCompletedCleaningTask = new this.completedCleaningTaskModel(
      createCompletedCleaningTaskInput
    )
    return createdCompletedCleaningTask.save()
  }

  async findAllCompletedCleaningTasks() {
    return this.completedCleaningTaskModel
      .find()
      .sort({ date: -1 })
      .populate('rooms')
      .populate('cleaningTask')
      .exec()
  }

  async getCompletedCleaningTaskById(id: MongooseSchema.Types.ObjectId) {
    return this.completedCleaningTaskModel
      .findById(id)
      .populate('rooms')
      .populate('cleaningTask')
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

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

  createCompletedCleaningTask(
    createCompletedCleaningTaskInput: CreateCompletedCleaningTaskInput
  ) {
    const createdCompletedCleaningTask = new this.completedCleaningTaskModel(
      createCompletedCleaningTaskInput
    )
    return createdCompletedCleaningTask.save()
  }

  findAllCompletedCleaningTasks() {
    return this.completedCleaningTaskModel
      .find()
      .sort({ date: -1 })
      .populate('rooms')
      .populate('cleaningTask')
      .exec()
  }

  getCompletedCleaningTaskById(id: MongooseSchema.Types.ObjectId) {
    return this.completedCleaningTaskModel
      .findById(id)
      .populate('rooms')
      .populate('cleaningTask')
  }

  updateCompletedCleaningTask(
    id: MongooseSchema.Types.ObjectId,
    updateCompletedCleaningTaskInput: UpdateCompletedCleaningTaskInput
  ) {
    return this.completedCleaningTaskModel.findByIdAndUpdate(
      id,
      updateCompletedCleaningTaskInput,
      {
        new: true
      }
    )
  }

  removeCompletedCleaningTask(id: number) {
    return this.completedCleaningTaskModel.findByIdAndDelete(id)
  }
}

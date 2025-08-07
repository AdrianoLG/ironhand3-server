import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateCleaningTaskInput } from './dto/create-cleaning-task.input'
import { UpdateCleaningTaskInput } from './dto/update-cleaning-task.input'
import {
  CleaningTask,
  CleaningTaskDocument
} from './entities/cleaning-task.entity'

@Injectable()
export class CleaningTasksService {
  constructor(
    @InjectModel(CleaningTask.name)
    private cleaningTaskModel: Model<CleaningTaskDocument>
  ) {}

  createCleaningTask(createCleaningTaskInput: CreateCleaningTaskInput) {
    const createdCleaningTask = new this.cleaningTaskModel(
      createCleaningTaskInput
    )
    return createdCleaningTask.save()
  }

  findAllCleaningTasks() {
    return this.cleaningTaskModel
      .find()
      .sort({ date: -1 })
      .populate('possibleRooms')
      .exec()
  }

  getCleaningTaskById(id: MongooseSchema.Types.ObjectId) {
    return this.cleaningTaskModel.findById(id).populate('possibleRooms')
  }

  updateCleaningTask(
    id: MongooseSchema.Types.ObjectId,
    updateCleaningTaskInput: UpdateCleaningTaskInput
  ) {
    return this.cleaningTaskModel.findByIdAndUpdate(
      id,
      updateCleaningTaskInput,
      { new: true }
    )
  }

  removeCleaningTask(id: MongooseSchema.Types.ObjectId) {
    return this.cleaningTaskModel.findByIdAndDelete(id)
  }
}

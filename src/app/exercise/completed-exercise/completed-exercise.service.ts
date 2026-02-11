import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateCompletedExerciseInput } from './dto/create-completed-exercise.input'
import { UpdateCompletedExerciseInput } from './dto/update-completed-exercise.input'
import {
  CompletedExercise,
  CompletedExerciseDocument
} from './entities/completed-exercise.entity'

@Injectable()
export class CompletedExerciseService {
  constructor(
    @InjectModel(CompletedExercise.name)
    private completedExerciseModel: Model<CompletedExerciseDocument>
  ) {}

  async createCompletedExercise(
    createCompletedExerciseInput: CreateCompletedExerciseInput
  ) {
    const createdCompletedExercise = new this.completedExerciseModel(
      createCompletedExerciseInput
    )
    return createdCompletedExercise.save()
  }

  async findAllCompletedExercises() {
    return this.completedExerciseModel
      .find()
      .sort({ date: -1 })
      .populate('exercise')
      .exec()
  }

  async getCompletedExerciseById(id: MongooseSchema.Types.ObjectId) {
    return this.completedExerciseModel
      .findById(id)
      .sort({ date: -1 })
      .populate('exercise')
      .exec()
  }

  async updateCompletedExercise(
    id: MongooseSchema.Types.ObjectId,
    updateCompletedExerciseInput: UpdateCompletedExerciseInput
  ) {
    return this.completedExerciseModel
      .findByIdAndUpdate(id, updateCompletedExerciseInput, {
        new: true
      })
      .exec()
  }

  async removeCompletedExercise(id: MongooseSchema.Types.ObjectId) {
    return this.completedExerciseModel.findByIdAndDelete(id).exec()
  }
}

import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import {
  CompletedExercise,
  CompletedExerciseDocument
} from '../completed-exercise/entities/completed-exercise.entity'
import { CreateExerciseInput } from './dto/create-exercise.input'
import { UpdateExerciseInput } from './dto/update-exercise.input'
import { Exercise, ExerciseDocument } from './entities/exercise.entity'

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name)
    private exerciseModel: Model<ExerciseDocument>,
    @InjectModel(CompletedExercise.name)
    private completedExerciseModel: Model<CompletedExerciseDocument>
  ) {}

  async createExercise(createExerciseInput: CreateExerciseInput) {
    const types = ['cardio', 'strength', 'stretch']
    if (types.indexOf(createExerciseInput.type) >= 0) {
      const createdExercise = new this.exerciseModel(createExerciseInput)
      return createdExercise.save()
    }
    throw new Error(`Type must be one of the following: ${types.join(', ')}`)
  }

  async findAllExercises() {
    return this.exerciseModel.find().exec()
  }

  async getExerciseById(id: MongooseSchema.Types.ObjectId) {
    return this.exerciseModel.findById(id).exec()
  }

  async updateExercise(
    id: MongooseSchema.Types.ObjectId,
    updateExerciseInput: UpdateExerciseInput
  ) {
    return this.exerciseModel
      .findByIdAndUpdate(id, updateExerciseInput, {
        new: true
      })
      .exec()
  }

  async removeExercise(id: MongooseSchema.Types.ObjectId) {
    const result = await this.exerciseModel.findByIdAndDelete(id).exec()
    await this.completedExerciseModel.deleteMany({ exercise: id }).exec()
    return result
  }
}

import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateExerciseInput } from './dto/create-exercise.input'
import { UpdateExerciseInput } from './dto/update-exercise.input'
import { Exercise, ExerciseDocument } from './entities/exercise.entity'

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name)
    private exerciseModel: Model<ExerciseDocument>
  ) {}

  createExercise(createExerciseInput: CreateExerciseInput) {
    const types = ['cardio', 'strength', 'stretch']
    if (types.indexOf(createExerciseInput.type) >= 0) {
      const createdExercise = new this.exerciseModel(createExerciseInput)
      return createdExercise.save()
    }
    throw new Error(`Type must be one of the following: ${types.join(', ')}`)
  }

  findAllExercises() {
    return this.exerciseModel.find().exec()
  }

  getExerciseById(id: MongooseSchema.Types.ObjectId) {
    return this.exerciseModel.findById(id)
  }

  updateExercise(
    id: MongooseSchema.Types.ObjectId,
    updateExerciseInput: UpdateExerciseInput
  ) {
    return this.exerciseModel.findByIdAndUpdate(id, updateExerciseInput, {
      new: true
    })
  }

  removeExercise(id: MongooseSchema.Types.ObjectId) {
    return this.exerciseModel.deleteOne({ _id: id })
  }
}

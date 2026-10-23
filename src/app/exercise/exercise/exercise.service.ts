import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
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

  async createExercise(createExerciseInput: CreateExerciseInput, owner: User) {
    const types = ['cardio', 'strength', 'stretch']
    if (types.indexOf(createExerciseInput.type) >= 0) {
      const createdExercise = new this.exerciseModel({
        ...createExerciseInput,
        owner: owner._id
      })
      return createdExercise.save()
    }
    throw new Error(`Type must be one of the following: ${types.join(', ')}`)
  }

  async findAllExercises(currentUser: User) {
    return this.exerciseModel.find({ owner: currentUser._id }).exec()
  }

  async getExerciseById(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const exercise = await this.exerciseModel.findById(id).exec()
    if (!exercise) return null
    assertOwner(exercise.owner, currentUser)
    return exercise
  }

  async updateExercise(
    id: MongooseSchema.Types.ObjectId,
    updateExerciseInput: UpdateExerciseInput,
    currentUser: User
  ) {
    const exercise = await this.exerciseModel.findById(id).exec()
    if (!exercise) return null
    assertOwner(exercise.owner, currentUser)
    return this.exerciseModel
      .findByIdAndUpdate(id, updateExerciseInput, {
        new: true
      })
      .exec()
  }

  async removeExercise(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const exercise = await this.exerciseModel.findById(id).exec()
    if (!exercise) return null
    assertOwner(exercise.owner, currentUser)
    const result = await this.exerciseModel.findByIdAndDelete(id).exec()
    await this.completedExerciseModel.deleteMany({ exercise: id }).exec()
    return result
  }
}

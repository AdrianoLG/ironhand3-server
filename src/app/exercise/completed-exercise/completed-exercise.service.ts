import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
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
    createCompletedExerciseInput: CreateCompletedExerciseInput,
    owner: User
  ) {
    const createdCompletedExercise = new this.completedExerciseModel({
      ...createCompletedExerciseInput,
      owner: owner._id
    })
    return createdCompletedExercise.save()
  }

  async findAllCompletedExercises(currentUser: User) {
    return this.completedExerciseModel
      .find({ owner: currentUser._id })
      .sort({ date: -1 })
      .populate('exercise')
      .exec()
  }

  async getCompletedExerciseById(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User
  ) {
    const completedExercise = await this.completedExerciseModel
      .findById(id)
      .exec()
    if (!completedExercise) return null
    assertOwner(completedExercise.owner, currentUser)
    return completedExercise.populate('exercise')
  }

  async updateCompletedExercise(
    id: MongooseSchema.Types.ObjectId,
    updateCompletedExerciseInput: UpdateCompletedExerciseInput,
    currentUser: User
  ) {
    const completedExercise = await this.completedExerciseModel
      .findById(id)
      .exec()
    if (!completedExercise) return null
    assertOwner(completedExercise.owner, currentUser)
    return this.completedExerciseModel
      .findByIdAndUpdate(id, updateCompletedExerciseInput, {
        new: true
      })
      .exec()
  }

  async removeCompletedExercise(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User
  ) {
    const completedExercise = await this.completedExerciseModel
      .findById(id)
      .exec()
    if (!completedExercise) return null
    assertOwner(completedExercise.owner, currentUser)
    return this.completedExerciseModel.findByIdAndDelete(id).exec()
  }
}

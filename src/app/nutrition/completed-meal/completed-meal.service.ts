import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { CreateCompletedMealInput } from './dto/create-completed-meal.input'
import { UpdateCompletedMealInput } from './dto/update-completed-meal.input'
import {
  CompletedMeal,
  CompletedMealDocument
} from './entities/completed-meal.entity'

@Injectable()
export class CompletedMealService {
  constructor(
    @InjectModel(CompletedMeal.name)
    private completedMealModel: Model<CompletedMealDocument>
  ) {}

  async createCompletedMeal(
    createCompletedMealInput: CreateCompletedMealInput,
    owner: User
  ) {
    const createdCompletedMeal = new this.completedMealModel({
      ...createCompletedMealInput,
      owner: owner._id
    })
    return createdCompletedMeal.save()
  }

  async findAllCompletedMeals(currentUser: User) {
    return this.completedMealModel
      .find({ owner: currentUser._id })
      .sort({ created: -1 })
      .populate('food')
      .exec()
  }

  async getCompletedMealById(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User
  ) {
    const completedMeal = await this.completedMealModel.findById(id).exec()
    if (!completedMeal) return null
    assertOwner(completedMeal.owner, currentUser)
    return completedMeal.populate('food')
  }

  async updateCompletedMeal(
    id: MongooseSchema.Types.ObjectId,
    updateCompletedMealInput: UpdateCompletedMealInput,
    currentUser: User
  ) {
    const completedMeal = await this.completedMealModel.findById(id).exec()
    if (!completedMeal) return null
    assertOwner(completedMeal.owner, currentUser)
    return this.completedMealModel
      .findByIdAndUpdate(id, updateCompletedMealInput, {
        new: true
      })
      .populate('food')
      .exec()
  }

  async removeCompletedMeal(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User
  ) {
    const completedMeal = await this.completedMealModel.findById(id).exec()
    if (!completedMeal) return null
    assertOwner(completedMeal.owner, currentUser)
    return this.completedMealModel.findByIdAndDelete(id).exec()
  }
}

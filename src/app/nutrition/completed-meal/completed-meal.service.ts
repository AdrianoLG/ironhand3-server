import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

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
    createCompletedMealInput: CreateCompletedMealInput
  ) {
    const createdCompletedMeal = new this.completedMealModel(
      createCompletedMealInput
    )
    return createdCompletedMeal.save()
  }

  async findAllCompletedMeals() {
    return this.completedMealModel
      .find()
      .sort({ created: -1 })
      .populate('food')
      .exec()
  }

  async getCompletedMealById(id: MongooseSchema.Types.ObjectId) {
    return this.completedMealModel.findById(id).populate('food').exec()
  }

  async updateCompletedMeal(
    id: MongooseSchema.Types.ObjectId,
    updateCompletedMealInput: UpdateCompletedMealInput
  ) {
    return this.completedMealModel
      .findByIdAndUpdate(id, updateCompletedMealInput, {
        new: true
      })
      .populate('food')
      .exec()
  }

  async removeCompletedMeal(id: MongooseSchema.Types.ObjectId) {
    return this.completedMealModel.findByIdAndDelete(id).exec()
  }
}

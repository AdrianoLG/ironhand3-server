import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateFoodInput } from './dto/create-food.input'
import { UpdateFoodInput } from './dto/update-food.input'
import { Food, FoodDocument } from './entities/food.entity'

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name)
    private foodModel: Model<FoodDocument>
  ) {}

  async createFood(createFoodInput: CreateFoodInput) {
    const created = new this.foodModel(createFoodInput)
    return created.save()
  }

  async findAllFoods() {
    return this.foodModel.find().sort({ created: -1 }).exec()
  }

  async getFoodById(id: MongooseSchema.Types.ObjectId) {
    return this.foodModel.findById(id).exec()
  }

  async updateFood(
    id: MongooseSchema.Types.ObjectId,
    updateFoodInput: UpdateFoodInput
  ) {
    return this.foodModel
      .findByIdAndUpdate(id, updateFoodInput, {
        new: true
      })
      .exec()
  }

  async removeFood(id: MongooseSchema.Types.ObjectId) {
    return this.foodModel.findByIdAndDelete(id).exec()
  }
}

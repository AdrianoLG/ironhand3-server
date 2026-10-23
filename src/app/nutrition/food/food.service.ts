import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { CreateFoodInput } from './dto/create-food.input'
import { UpdateFoodInput } from './dto/update-food.input'
import { Food, FoodDocument } from './entities/food.entity'

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name)
    private foodModel: Model<FoodDocument>
  ) {}

  async createFood(createFoodInput: CreateFoodInput, owner: User) {
    const created = new this.foodModel({
      ...createFoodInput,
      owner: owner._id
    })
    return created.save()
  }

  async findAllFoods(currentUser: User) {
    return this.foodModel
      .find({ owner: currentUser._id })
      .sort({ name: 1 })
      .exec()
  }

  async getFoodById(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const food = await this.foodModel.findById(id).exec()
    if (!food) return null
    assertOwner(food.owner, currentUser)
    return food
  }

  async updateFood(
    id: MongooseSchema.Types.ObjectId,
    updateFoodInput: UpdateFoodInput,
    currentUser: User
  ) {
    const food = await this.foodModel.findById(id).exec()
    if (!food) return null
    assertOwner(food.owner, currentUser)
    return this.foodModel
      .findByIdAndUpdate(id, updateFoodInput, {
        new: true
      })
      .exec()
  }

  async removeFood(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const food = await this.foodModel.findById(id).exec()
    if (!food) return null
    assertOwner(food.owner, currentUser)
    return this.foodModel.findByIdAndDelete(id).exec()
  }
}

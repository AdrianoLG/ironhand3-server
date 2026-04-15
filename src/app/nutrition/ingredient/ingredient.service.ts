import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateIngredientInput } from './dto/create-ingredient.input'
import { UpdateIngredientInput } from './dto/update-ingredient.input'
import { Ingredient, IngredientDocument } from './entities/ingredient.entity'

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>
  ) {}

  async createIngredient(createIngredientInput: CreateIngredientInput) {
    const created = new this.ingredientModel(createIngredientInput)
    return created.save()
  }

  async findAllIngredients() {
    return this.ingredientModel.find().sort({ name: 1 }).exec()
  }

  async getIngredientById(id: MongooseSchema.Types.ObjectId) {
    return this.ingredientModel.findById(id).exec()
  }

  async updateIngredient(
    id: MongooseSchema.Types.ObjectId,
    updateIngredientInput: UpdateIngredientInput
  ) {
    return this.ingredientModel
      .findByIdAndUpdate(id, updateIngredientInput, {
        new: true
      })
      .exec()
  }

  async removeIngredient(id: MongooseSchema.Types.ObjectId) {
    return this.ingredientModel.findByIdAndDelete(id).exec()
  }
}

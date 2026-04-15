import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateRecipeInput } from './dto/create-recipe.input'
import { UpdateRecipeInput } from './dto/update-recipe.input'
import { Recipe, RecipeDocument } from './entities/recipe.entity'

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name)
    private recipeModel: Model<RecipeDocument>
  ) {}

  async createRecipe(createRecipeInput: CreateRecipeInput) {
    const created = new this.recipeModel(createRecipeInput)
    return created.save()
  }

  async findAllRecipes() {
    return this.recipeModel.find().sort({ name: 1 }).exec()
  }

  async getRecipeById(id: MongooseSchema.Types.ObjectId) {
    return this.recipeModel.findById(id).exec()
  }

  async updateRecipe(
    id: MongooseSchema.Types.ObjectId,
    updateRecipeInput: UpdateRecipeInput
  ) {
    return this.recipeModel
      .findByIdAndUpdate(id, updateRecipeInput, {
        new: true
      })
      .exec()
  }

  async removeRecipe(id: MongooseSchema.Types.ObjectId) {
    return this.recipeModel.findByIdAndDelete(id).exec()
  }
}

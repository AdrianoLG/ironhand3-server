import { Model, Schema as MongooSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import {
  Shortcut,
  ShortcutDocument
} from '../shortcut/entities/shortcut.entity'
import { CreateShortcutCategoryInput, UpdateShortcutCategoryInput } from './dto'
import {
  ShortcutCategory,
  ShortcutCategoryDocument
} from './entities/shortcut-category.entity'

@Injectable()
export class ShortcutCategoryService {
  constructor(
    @InjectModel(ShortcutCategory.name)
    private shortcutCategoryModel: Model<ShortcutCategoryDocument>,
    @InjectModel(Shortcut.name)
    private shortcutModel: Model<ShortcutDocument>
  ) {}

  async createShortcutCategory(
    createShortcutCategoryInput: CreateShortcutCategoryInput
  ) {
    const createdShortcutCategory = new this.shortcutCategoryModel(
      createShortcutCategoryInput
    )
    createdShortcutCategory.shortcuts.map(async (shortcutId) => {
      await this.shortcutModel
        .findByIdAndUpdate(
          shortcutId,
          { category: createdShortcutCategory._id },
          { new: true }
        )
        .exec()
    })

    return createdShortcutCategory.save()
  }

  async findAllShortcutCategories() {
    return this.shortcutCategoryModel.find().populate('shortcuts').exec()
  }

  async getShortcutCategoryById(id: MongooSchema.Types.ObjectId) {
    return this.shortcutCategoryModel.findById(id).populate('shortcuts').exec()
  }

  async updateShortcutCategoryInput(
    id: MongooSchema.Types.ObjectId,
    updateShortcutCategoryInput: UpdateShortcutCategoryInput
  ) {
    return this.shortcutCategoryModel
      .findByIdAndUpdate(id, updateShortcutCategoryInput, { new: true })
      .exec()
  }

  async removeShortcutCategory(id: MongooSchema.Types.ObjectId) {
    return this.shortcutCategoryModel.deleteOne({ _id: id }).exec()
  }
}

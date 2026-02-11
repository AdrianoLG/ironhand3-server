import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import {
  ShortcutCategory,
  ShortcutCategoryDocument
} from '../shortcut-category/entities/shortcut-category.entity'
import { CreateShortcutInput, UpdateShortcutInput } from './dto'
import { Shortcut, ShortcutDocument } from './entities/shortcut.entity'

@Injectable()
export class ShortcutService {
  constructor(
    @InjectModel(Shortcut.name)
    private shortcutModel: Model<ShortcutDocument>,
    @InjectModel(ShortcutCategory.name)
    private shortcutCategoryModel: Model<ShortcutCategoryDocument>
  ) {}

  async createShortcut(createShortcutInput: CreateShortcutInput) {
    const createdShortcut = new this.shortcutModel(createShortcutInput)
    await this.shortcutCategoryModel
      .findByIdAndUpdate(
        createdShortcut.category,
        { $push: { shortcuts: createdShortcut._id } },
        { new: true }
      )
      .exec()
    return createdShortcut.save()
  }

  async findAllShortcuts() {
    return this.shortcutModel.find().populate('category').exec()
  }

  async getShortcutById(id: MongooseSchema.Types.ObjectId) {
    return this.shortcutModel.findById(id).populate('category').exec()
  }

  async updateShortcut(
    id: MongooseSchema.Types.ObjectId,
    updateShortcutInput: UpdateShortcutInput
  ) {
    return this.shortcutModel
      .findByIdAndUpdate(id, updateShortcutInput, {
        new: true
      })
      .exec()
  }

  async removeShortcut(id: MongooseSchema.Types.ObjectId) {
    return this.shortcutModel.deleteOne({ _id: id }).exec()
  }
}

import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateSavingInput } from './dto/create-saving.input'
import { UpdateSavingInput } from './dto/update-saving.input'
import { Saving, SavingDocument } from './entities/saving.entity'

@Injectable()
export class SavingService {
  constructor(
    @InjectModel(Saving.name)
    private savingModel: Model<SavingDocument>
  ) {}

  async createSaving(createSavingInput: CreateSavingInput) {
    const createdSaving = new this.savingModel(createSavingInput)

    return createdSaving.save()
  }

  async findAllSavings() {
    return this.savingModel.find().populate('goals').exec()
  }

  async getSavingById(id: MongooseSchema.Types.ObjectId) {
    return this.savingModel.findById(id).populate('goals').exec()
  }

  async updateSaving(
    id: MongooseSchema.Types.ObjectId,
    updateSavingInput: UpdateSavingInput
  ) {
    return this.savingModel
      .findByIdAndUpdate(id, updateSavingInput, { new: true })
      .populate('goals')
      .exec()
  }

  async removeSaving(id: MongooseSchema.Types.ObjectId) {
    return this.savingModel.findByIdAndDelete(id).exec()
  }
}

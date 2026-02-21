import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateWateringInput } from './dto/create-watering.input'
import { UpdateWateringInput } from './dto/update-watering.input'
import { Watering, WateringDocument } from './entities/watering.entity'

@Injectable()
export class WateringService {
  constructor(
    @InjectModel(Watering.name)
    private wateringModel: Model<WateringDocument>
  ) {}

  async createWatering(createWateringInput: CreateWateringInput) {
    const created = new this.wateringModel(createWateringInput)
    return created.save()
  }

  async findAllWaterings() {
    return this.wateringModel
      .find()
      .sort({ date: -1 })
      .populate('fertilizers.fertilizer')
      .exec()
  }

  async getWateringById(id: MongooseSchema.Types.ObjectId) {
    return this.wateringModel
      .findById(id)
      .populate('fertilizers.fertilizer')
      .exec()
  }

  async updateWatering(
    id: MongooseSchema.Types.ObjectId,
    updateWateringInput: UpdateWateringInput
  ) {
    return this.wateringModel
      .findByIdAndUpdate(id, updateWateringInput, {
        new: true
      })
      .populate('fertilizers.fertilizer')
      .exec()
  }

  async removeWatering(id: MongooseSchema.Types.ObjectId) {
    return this.wateringModel.findByIdAndDelete(id).exec()
  }
}

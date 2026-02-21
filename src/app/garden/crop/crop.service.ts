import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateCropInput } from './dto/create-crop.input'
import { UpdateCropInput } from './dto/update-crop.input'
import { Crop, CropDocument } from './entities/crop.entity'

@Injectable()
export class CropService {
  constructor(
    @InjectModel(Crop.name)
    private cropModel: Model<CropDocument>
  ) {}

  async createCrop(createCropInput: CreateCropInput) {
    const created = new this.cropModel(createCropInput)
    return created.save()
  }

  async findAllCrops() {
    return this.cropModel
      .find()
      .sort({ startDate: -1 })
      .populate('plants')
      .populate('cropContainer')
      .exec()
  }

  async getCropById(id: MongooseSchema.Types.ObjectId) {
    return this.cropModel
      .findById(id)
      .populate('plants')
      .populate('cropContainer')
      .exec()
  }

  async updateCrop(
    id: MongooseSchema.Types.ObjectId,
    updateCropInput: UpdateCropInput
  ) {
    return this.cropModel
      .findByIdAndUpdate(id, updateCropInput, {
        new: true
      })
      .populate('plants')
      .populate('cropContainer')
      .exec()
  }

  async removeCrop(id: MongooseSchema.Types.ObjectId) {
    return this.cropModel.findByIdAndDelete(id).exec()
  }
}

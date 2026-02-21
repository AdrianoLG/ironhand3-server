import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateCropContainerInput } from './dto/create-crop-container.input'
import { UpdateCropContainerInput } from './dto/update-crop-container.input'
import {
  CropContainer,
  CropContainerDocument
} from './entities/crop-container.entity'

@Injectable()
export class CropContainerService {
  constructor(
    @InjectModel(CropContainer.name)
    private cropContainerModel: Model<CropContainerDocument>
  ) {}

  async createCropContainer(
    createCropContainerInput: CreateCropContainerInput
  ) {
    const created = new this.cropContainerModel(createCropContainerInput)
    return created.save()
  }

  async findAllCropContainers() {
    return this.cropContainerModel.find().exec()
  }

  async getCropContainerById(id: MongooseSchema.Types.ObjectId) {
    return this.cropContainerModel.findById(id).exec()
  }

  async updateCropContainer(
    id: MongooseSchema.Types.ObjectId,
    updateCropContainerInput: UpdateCropContainerInput
  ) {
    return this.cropContainerModel
      .findByIdAndUpdate(id, updateCropContainerInput, {
        new: true
      })
      .exec()
  }

  async removeCropContainer(id: MongooseSchema.Types.ObjectId) {
    return this.cropContainerModel.findByIdAndDelete(id).exec()
  }
}

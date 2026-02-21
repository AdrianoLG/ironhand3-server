import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateFertilizerInput } from './dto/create-fertilizer.input'
import { UpdateFertilizerInput } from './dto/update-fertilizer.input'
import { Fertilizer, FertilizerDocument } from './entities/fertilizer.entity'

@Injectable()
export class FertilizerService {
  constructor(
    @InjectModel(Fertilizer.name)
    private fertilizerModel: Model<FertilizerDocument>
  ) {}

  async createFertilizer(createFertilizerInput: CreateFertilizerInput) {
    const created = new this.fertilizerModel(createFertilizerInput)
    return created.save()
  }

  async findAllFertilizers() {
    return this.fertilizerModel.find().exec()
  }

  async getFertilizerById(id: MongooseSchema.Types.ObjectId) {
    return this.fertilizerModel.findById(id).exec()
  }

  async updateFertilizer(
    id: MongooseSchema.Types.ObjectId,
    updateFertilizerInput: UpdateFertilizerInput
  ) {
    return this.fertilizerModel
      .findByIdAndUpdate(id, updateFertilizerInput, {
        new: true
      })
      .exec()
  }

  async removeFertilizer(id: MongooseSchema.Types.ObjectId) {
    return this.fertilizerModel.findByIdAndDelete(id).exec()
  }
}

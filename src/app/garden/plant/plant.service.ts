import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreatePlantInput } from './dto/create-plant.input'
import { UpdatePlantInput } from './dto/update-plant.input'
import { Plant, PlantDocument } from './entities/plant.entity'

@Injectable()
export class PlantService {
  constructor(
    @InjectModel(Plant.name)
    private plantModel: Model<PlantDocument>
  ) {}

  async createPlant(createPlantInput: CreatePlantInput) {
    const created = new this.plantModel(createPlantInput)
    return created.save()
  }

  async findAllPlants() {
    return this.plantModel
      .find()
      .sort({ planted: -1 })
      .populate('specie')
      .populate({
        path: 'watering',
        populate: { path: 'fertilizers.fertilizer' }
      })
      .exec()
  }

  async getPlantById(id: MongooseSchema.Types.ObjectId) {
    return this.plantModel
      .findById(id)
      .populate('specie')
      .populate({
        path: 'watering',
        populate: { path: 'fertilizers.fertilizer' }
      })
      .exec()
  }

  async updatePlant(
    id: MongooseSchema.Types.ObjectId,
    updatePlantInput: UpdatePlantInput
  ) {
    return this.plantModel
      .findByIdAndUpdate(id, updatePlantInput, {
        new: true
      })
      .populate('specie')
      .populate({
        path: 'watering',
        populate: { path: 'fertilizers.fertilizer' }
      })
      .exec()
  }

  async removePlant(id: MongooseSchema.Types.ObjectId) {
    return this.plantModel.findByIdAndDelete(id).exec()
  }
}

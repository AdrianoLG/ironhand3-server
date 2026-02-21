import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateSpecieInput } from './dto/create-specie.input'
import { UpdateSpecieInput } from './dto/update-specie.input'
import { Specie, SpecieDocument } from './entities/specie.entity'

@Injectable()
export class SpecieService {
  constructor(
    @InjectModel(Specie.name)
    private specieModel: Model<SpecieDocument>
  ) {}

  async createSpecie(createSpecieInput: CreateSpecieInput) {
    const created = new this.specieModel(createSpecieInput)
    return created.save()
  }

  async findAllSpecies() {
    return this.specieModel.find().exec()
  }

  async getSpecieById(id: MongooseSchema.Types.ObjectId) {
    return this.specieModel.findById(id).exec()
  }

  async updateSpecie(
    id: MongooseSchema.Types.ObjectId,
    updateSpecieInput: UpdateSpecieInput
  ) {
    return this.specieModel
      .findByIdAndUpdate(id, updateSpecieInput, {
        new: true
      })
      .exec()
  }

  async removeSpecie(id: MongooseSchema.Types.ObjectId) {
    return this.specieModel.findByIdAndDelete(id).exec()
  }
}

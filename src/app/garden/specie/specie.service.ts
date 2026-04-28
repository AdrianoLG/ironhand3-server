import { Model, Schema as MongooseSchema } from 'mongoose'

import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Plant, PlantDocument } from '../plant/entities/plant.entity'
import { CreateSpecieInput } from './dto/create-specie.input'
import { UpdateSpecieInput } from './dto/update-specie.input'
import { Specie, SpecieDocument } from './entities/specie.entity'

@Injectable()
export class SpecieService {
  constructor(
    @InjectModel(Specie.name)
    private specieModel: Model<SpecieDocument>,
    @InjectModel(Plant.name)
    private plantModel: Model<PlantDocument>
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
    const plantCount = await this.plantModel
      .countDocuments({ specie: id })
      .exec()
    if (plantCount > 0)
      throw new BadRequestException(
        `Cannot delete specie: it has ${plantCount} associated plant(s)`
      )
    const deleted = await this.specieModel.findByIdAndDelete(id).exec()
    if (!deleted) throw new NotFoundException(`Specie with id ${id} not found`)
    return deleted
  }
}

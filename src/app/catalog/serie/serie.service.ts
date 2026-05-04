import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateSerieInput } from './dto/create-serie.input'
import { UpdateSerieInput } from './dto/update-serie.input'
import { Serie, SerieDocument } from './entities/serie.entity'

@Injectable()
export class SerieService {
  constructor(
    @InjectModel(Serie.name)
    private serieModel: Model<SerieDocument>
  ) {}

  async createSerie(createSerieInput: CreateSerieInput) {
    const createdSerie = new this.serieModel(createSerieInput)
    return createdSerie.save()
  }

  async findAllSeries() {
    return this.serieModel
      .find()
      .sort({ title: 1 })
      .populate('director')
      .populate('actors')
      .populate('country')
      .populate('genres')
      .exec()
  }

  async getSerieById(id: MongooseSchema.Types.ObjectId) {
    return this.serieModel
      .findById(id)
      .populate('director')
      .populate('actors')
      .populate('country')
      .populate('genres')
      .exec()
  }

  async updateSerie(
    id: MongooseSchema.Types.ObjectId,
    updateSerieInput: UpdateSerieInput
  ) {
    return this.serieModel
      .findByIdAndUpdate(id, updateSerieInput, { new: true })
      .populate('director')
      .populate('actors')
      .populate('country')
      .populate('genres')
      .exec()
  }

  async removeSerie(id: MongooseSchema.Types.ObjectId) {
    return this.serieModel.findByIdAndDelete(id).exec()
  }
}

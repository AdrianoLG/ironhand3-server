import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { CreateSerieInput } from './dto/create-serie.input'
import { UpdateSerieInput } from './dto/update-serie.input'
import { Serie, SerieDocument } from './entities/serie.entity'

@Injectable()
export class SerieService {
  constructor(
    @InjectModel(Serie.name)
    private serieModel: Model<SerieDocument>
  ) {}

  async createSerie(createSerieInput: CreateSerieInput, owner: User) {
    const createdSerie = new this.serieModel({
      ...createSerieInput,
      owner: owner._id
    })
    return createdSerie.save()
  }

  async findAllSeries(
    currentUser: User,
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    return this.serieModel
      .find({ owner: viewUserId ?? currentUser._id })
      .sort({ title: 1 })
      .populate({ path: 'director', populate: { path: 'birthCountry' } })
      .populate({ path: 'actors', populate: { path: 'birthCountry' } })
      .populate('country')
      .populate('genres')
      .populate('owner')
      .exec()
  }

  async getSerieById(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User,
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    const serie = await this.serieModel.findById(id).exec()
    if (!serie) return null
    const targetOwnerId = viewUserId ?? currentUser._id
    assertOwner(serie.owner, { _id: targetOwnerId } as User)
    return serie.populate([
      { path: 'director', populate: { path: 'birthCountry' } },
      { path: 'actors', populate: { path: 'birthCountry' } },
      'country',
      'genres',
      'owner'
    ])
  }

  async updateSerie(
    id: MongooseSchema.Types.ObjectId,
    updateSerieInput: UpdateSerieInput,
    currentUser: User
  ) {
    const serie = await this.serieModel.findById(id).exec()
    if (!serie) return null
    assertOwner(serie.owner, currentUser)
    return this.serieModel
      .findByIdAndUpdate(id, updateSerieInput, { new: true })
      .populate({ path: 'director', populate: { path: 'birthCountry' } })
      .populate({ path: 'actors', populate: { path: 'birthCountry' } })
      .populate('country')
      .populate('genres')
      .populate('owner')
      .exec()
  }

  async removeSerie(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const serie = await this.serieModel.findById(id).exec()
    if (!serie) return null
    assertOwner(serie.owner, currentUser)
    return this.serieModel.findByIdAndDelete(id).exec()
  }
}

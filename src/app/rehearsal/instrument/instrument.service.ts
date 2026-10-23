import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { CreateInstrumentInput } from './dto/create-instrument.input'
import { UpdateInstrumentInput } from './dto/update-instrument.input'
import { Instrument, InstrumentDocument } from './entities/instrument.entity'

@Injectable()
export class InstrumentService {
  constructor(
    @InjectModel(Instrument.name)
    private instrumentModel: Model<InstrumentDocument>
  ) {}

  async createInstrument(
    createInstrumentInput: CreateInstrumentInput,
    owner: User
  ) {
    const createdInstrument = new this.instrumentModel({
      ...createInstrumentInput,
      owner: owner._id
    })
    return createdInstrument.save()
  }

  async findAllInstruments(currentUser: User) {
    return this.instrumentModel.find({ owner: currentUser._id }).exec()
  }

  async getInstrumentById(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User
  ) {
    const instrument = await this.instrumentModel.findById(id).exec()
    if (!instrument) return null
    assertOwner(instrument.owner, currentUser)
    return instrument
  }

  async updateInstrument(
    id: MongooseSchema.Types.ObjectId,
    updateInstrumentInput: UpdateInstrumentInput,
    currentUser: User
  ) {
    const instrument = await this.instrumentModel.findById(id).exec()
    if (!instrument) return null
    assertOwner(instrument.owner, currentUser)
    return this.instrumentModel
      .findByIdAndUpdate(id, updateInstrumentInput, {
        new: true
      })
      .exec()
  }

  async removeInstrument(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const instrument = await this.instrumentModel.findById(id).exec()
    if (!instrument) return null
    assertOwner(instrument.owner, currentUser)
    return this.instrumentModel.findByIdAndDelete(id).exec()
  }
}

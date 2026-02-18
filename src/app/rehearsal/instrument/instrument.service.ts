import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateInstrumentInput } from './dto/create-instrument.input'
import { UpdateInstrumentInput } from './dto/update-instrument.input'
import { Instrument, InstrumentDocument } from './entities/instrument.entity'

@Injectable()
export class InstrumentService {
  constructor(
    @InjectModel(Instrument.name)
    private instrumentModel: Model<InstrumentDocument>
  ) {}

  async createInstrument(createInstrumentInput: CreateInstrumentInput) {
    const createdInstrument = new this.instrumentModel(createInstrumentInput)
    return createdInstrument.save()
  }

  async findAllInstruments() {
    return this.instrumentModel.find().exec()
  }

  async getInstrumentById(id: MongooseSchema.Types.ObjectId) {
    return this.instrumentModel.findById(id).exec()
  }

  async updateInstrument(
    id: MongooseSchema.Types.ObjectId,
    updateInstrumentInput: UpdateInstrumentInput
  ) {
    return this.instrumentModel
      .findByIdAndUpdate(id, updateInstrumentInput, {
        new: true
      })
      .exec()
  }

  async removeInstrument(id: MongooseSchema.Types.ObjectId) {
    return this.instrumentModel.findByIdAndDelete(id).exec()
  }
}

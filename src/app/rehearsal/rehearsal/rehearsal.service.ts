import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateRehearsalInput } from './dto/create-rehearsal.input'
import { UpdateRehearsalInput } from './dto/update-rehearsal.input'
import { Rehearsal, RehearsalDocument } from './entities/rehearsal.entity'

@Injectable()
export class RehearsalService {
  constructor(
    @InjectModel(Rehearsal.name)
    private rehearsalModel: Model<RehearsalDocument>
  ) {}

  async createRehearsal(createRehearsalInput: CreateRehearsalInput) {
    const createdRehearsal = new this.rehearsalModel(createRehearsalInput)
    return createdRehearsal.save()
  }

  async findAllRehearsals() {
    return this.rehearsalModel
      .find()
      .sort({ completedAt: -1 })
      .populate('instrument')
      .populate({
        path: 'sheets.sheet',
        populate: { path: 'possibleInstruments' }
      })
      .exec()
  }

  async getRehearsalById(id: MongooseSchema.Types.ObjectId) {
    return this.rehearsalModel
      .findById(id)
      .populate('instrument')
      .populate({
        path: 'sheets.sheet',
        populate: { path: 'possibleInstruments' }
      })
      .exec()
  }

  async updateRehearsal(
    id: MongooseSchema.Types.ObjectId,
    updateRehearsalInput: UpdateRehearsalInput
  ) {
    return this.rehearsalModel
      .findByIdAndUpdate(id, updateRehearsalInput, {
        new: true
      })
      .exec()
  }

  async removeRehearsal(id: MongooseSchema.Types.ObjectId) {
    return this.rehearsalModel.findByIdAndDelete(id).exec()
  }
}

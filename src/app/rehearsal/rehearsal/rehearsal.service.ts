import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { CreateRehearsalInput } from './dto/create-rehearsal.input'
import { UpdateRehearsalInput } from './dto/update-rehearsal.input'
import { Rehearsal, RehearsalDocument } from './entities/rehearsal.entity'

@Injectable()
export class RehearsalService {
  constructor(
    @InjectModel(Rehearsal.name)
    private rehearsalModel: Model<RehearsalDocument>
  ) {}

  async createRehearsal(
    createRehearsalInput: CreateRehearsalInput,
    owner: User
  ) {
    const createdRehearsal = new this.rehearsalModel({
      ...createRehearsalInput,
      owner: owner._id
    })
    return createdRehearsal.save()
  }

  async findAllRehearsals(currentUser: User) {
    return this.rehearsalModel
      .find({ owner: currentUser._id })
      .sort({ completedAt: -1 })
      .populate('instrument')
      .populate({
        path: 'sheets.sheet',
        populate: { path: 'possibleInstruments' }
      })
      .exec()
  }

  async getRehearsalById(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const rehearsal = await this.rehearsalModel.findById(id).exec()
    if (!rehearsal) return null
    assertOwner(rehearsal.owner, currentUser)
    return rehearsal.populate([
      'instrument',
      {
        path: 'sheets.sheet',
        populate: { path: 'possibleInstruments' }
      }
    ])
  }

  async updateRehearsal(
    id: MongooseSchema.Types.ObjectId,
    updateRehearsalInput: UpdateRehearsalInput,
    currentUser: User
  ) {
    const rehearsal = await this.rehearsalModel.findById(id).exec()
    if (!rehearsal) return null
    assertOwner(rehearsal.owner, currentUser)
    return this.rehearsalModel
      .findByIdAndUpdate(id, updateRehearsalInput, {
        new: true
      })
      .exec()
  }

  async removeRehearsal(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const rehearsal = await this.rehearsalModel.findById(id).exec()
    if (!rehearsal) return null
    assertOwner(rehearsal.owner, currentUser)
    return this.rehearsalModel.findByIdAndDelete(id).exec()
  }
}

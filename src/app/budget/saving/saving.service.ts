import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { CreateSavingInput } from './dto/create-saving.input'
import { UpdateSavingInput } from './dto/update-saving.input'
import { Saving, SavingDocument } from './entities/saving.entity'

@Injectable()
export class SavingService {
  constructor(
    @InjectModel(Saving.name)
    private savingModel: Model<SavingDocument>
  ) {}

  async createSaving(createSavingInput: CreateSavingInput, owner: User) {
    const createdSaving = new this.savingModel({
      ...createSavingInput,
      owner: owner._id
    })

    return createdSaving.save()
  }

  async findAllSavings(currentUser: User) {
    return this.savingModel
      .find({ owner: currentUser._id })
      .populate('goals')
      .exec()
  }

  async getSavingById(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const saving = await this.savingModel.findById(id).exec()
    if (!saving) return null
    assertOwner(saving.owner, currentUser)
    return saving.populate('goals')
  }

  async updateSaving(
    id: MongooseSchema.Types.ObjectId,
    updateSavingInput: UpdateSavingInput,
    currentUser: User
  ) {
    const saving = await this.savingModel.findById(id).exec()
    if (!saving) return null
    assertOwner(saving.owner, currentUser)
    return this.savingModel
      .findByIdAndUpdate(id, updateSavingInput, { new: true })
      .populate('goals')
      .exec()
  }

  async removeSaving(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const saving = await this.savingModel.findById(id).exec()
    if (!saving) return null
    assertOwner(saving.owner, currentUser)
    return this.savingModel.findByIdAndDelete(id).exec()
  }
}

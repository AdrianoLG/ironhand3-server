import { Model, Schema as MongooSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateHeaderInput } from './dto/create-header.input'
import { UpdateHeaderInput } from './dto/update-header.input'
import { Header, HeaderDocument } from './entities/header.entity'

@Injectable()
export class HeaderService {
  constructor(
    @InjectModel(Header.name)
    private headerModel: Model<HeaderDocument>
  ) {}

  createHeader(createHeaderInput: CreateHeaderInput) {
    const createdHeader = new this.headerModel(createHeaderInput)
    return createdHeader.save()
  }

  findAllHeaders() {
    return this.headerModel.find().exec()
  }

  getHeaderById(id: MongooSchema.Types.ObjectId) {
    return this.headerModel.findById(id).exec()
  }

  updateHeader(
    id: MongooSchema.Types.ObjectId,
    updateHeaderInput: UpdateHeaderInput
  ) {
    return this.headerModel.findByIdAndUpdate(id, updateHeaderInput, {
      new: true
    })
  }

  removeHeader(id: MongooSchema.Types.ObjectId) {
    return this.headerModel.deleteOne({ _id: id })
  }
}

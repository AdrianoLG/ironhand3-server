import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import {
  Rehearsal,
  RehearsalDocument
} from '../rehearsal/entities/rehearsal.entity'
import { CreateSheetInput } from './dto/create-sheet.input'
import { UpdateSheetInput } from './dto/update-sheet.input'
import { Sheet, SheetDocument } from './entities/sheet.entity'

@Injectable()
export class SheetService {
  constructor(
    @InjectModel(Sheet.name)
    private sheetModel: Model<SheetDocument>,
    @InjectModel(Rehearsal.name)
    private rehearsalModel: Model<RehearsalDocument>
  ) {}

  async createSheet(createSheetInput: CreateSheetInput) {
    const createdSheet = new this.sheetModel(createSheetInput)
    return createdSheet.save()
  }

  async findAllSheets() {
    const playsCounts = await this.rehearsalModel
      .aggregate([
        { $unwind: '$sheets' },
        { $group: { _id: '$sheets.sheet', plays: { $sum: 1 } } },
        { $sort: { plays: -1 } }
      ])
      .exec()

    const playsMap = new Map<string, number>()
    for (const row of playsCounts) {
      if (row && row._id) {
        playsMap.set(String(row._id), row.plays ?? 0)
      }
    }

    const sheets = await this.sheetModel
      .find()
      .populate('possibleInstruments')
      .exec()

    sheets.sort((a, b) => {
      const pa = playsMap.get(String(a._id)) || 0
      const pb = playsMap.get(String(b._id)) || 0
      if (pb !== pa) return pb - pa
      return (a.title || '').localeCompare(b.title || '')
    })

    return sheets
  }

  async getSheetById(id: MongooseSchema.Types.ObjectId) {
    return this.sheetModel.findById(id).populate('possibleInstruments').exec()
  }

  async updateSheet(
    id: MongooseSchema.Types.ObjectId,
    updateSheetInput: UpdateSheetInput
  ) {
    return this.sheetModel
      .findByIdAndUpdate(id, updateSheetInput, {
        new: true
      })
      .exec()
  }

  async removeSheet(id: MongooseSchema.Types.ObjectId) {
    return this.sheetModel.findByIdAndDelete(id).exec()
  }
}

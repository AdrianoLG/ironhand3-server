import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateCountryInput } from './dto/create-country.input'
import { UpdateCountryInput } from './dto/update-country.input'
import { Country, CountryDocument } from './entities/country.entity'

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name)
    private countryModel: Model<CountryDocument>
  ) {}

  async createCountry(createCountryInput: CreateCountryInput) {
    const createdCountry = new this.countryModel(createCountryInput)
    return createdCountry.save()
  }

  async findAllCountries() {
    return this.countryModel.find().sort({ name: 1 }).exec()
  }

  async getCountryById(id: MongooseSchema.Types.ObjectId) {
    return this.countryModel.findById(id).exec()
  }

  async updateCountry(
    id: MongooseSchema.Types.ObjectId,
    updateCountryInput: UpdateCountryInput
  ) {
    return this.countryModel
      .findByIdAndUpdate(id, updateCountryInput, { new: true })
      .exec()
  }

  async removeCountry(id: MongooseSchema.Types.ObjectId) {
    return this.countryModel.findByIdAndDelete(id).exec()
  }
}

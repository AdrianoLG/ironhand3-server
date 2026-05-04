import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreatePersonInput } from './dto/create-person.input'
import { UpdatePersonInput } from './dto/update-person.input'
import { Person, PersonDocument } from './entities/person.entity'

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name)
    private personModel: Model<PersonDocument>
  ) {}

  async createPerson(createPersonInput: CreatePersonInput) {
    const createdPerson = new this.personModel(createPersonInput)
    return createdPerson.save()
  }

  async findAllPeople() {
    return this.personModel
      .find()
      .sort({ name: 1, lastName: 1 })
      .populate('birthCountry')
      .exec()
  }

  async getPersonById(id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findById(id).populate('birthCountry').exec()
  }

  async updatePerson(
    id: MongooseSchema.Types.ObjectId,
    updatePersonInput: UpdatePersonInput
  ) {
    return this.personModel
      .findByIdAndUpdate(id, updatePersonInput, { new: true })
      .populate('birthCountry')
      .exec()
  }

  async removePerson(id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findByIdAndDelete(id).exec()
  }
}

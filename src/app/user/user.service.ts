import { Model, Schema as MongooSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User, UserDocument } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  createUser(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput)
    return createdUser.save()
  }

  findAllUsers() {
    return this.userModel.find().exec()
  }

  getUserById(id: MongooSchema.Types.ObjectId) {
    return this.userModel.findById(id)
  }

  updateUser(
    id: MongooSchema.Types.ObjectId,
    updateUserInput: UpdateUserInput
  ) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true })
  }

  removeUser(id: MongooSchema.Types.ObjectId) {
    return this.userModel.deleteOne({ _id: id })
  }
}

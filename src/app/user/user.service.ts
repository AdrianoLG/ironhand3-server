import * as bcrypt from 'bcrypt'
import { Model, Schema as MongooSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User, UserDocument } from './entities/user.entity'

const SALT_ROUNDS = 10

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async createUser(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(
      createUserInput.password,
      SALT_ROUNDS
    )
    const createdUser = new this.userModel({
      ...createUserInput,
      password: hashedPassword
    })
    return createdUser.save()
  }

  async findAllUsers() {
    return this.userModel.find().exec()
  }

  async getUserById(id: MongooSchema.Types.ObjectId) {
    return this.userModel.findById(id).exec()
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec()
  }

  async updateUser(
    id: MongooSchema.Types.ObjectId,
    updateUserInput: UpdateUserInput
  ) {
    const update: Partial<UpdateUserInput> = { ...updateUserInput }
    if (update.password) {
      update.password = await bcrypt.hash(update.password, SALT_ROUNDS)
    }
    return this.userModel.findByIdAndUpdate(id, update, { new: true }).exec()
  }

  async removeUser(id: MongooSchema.Types.ObjectId) {
    return this.userModel.deleteOne({ _id: id }).exec()
  }

  async setResetPasswordToken(
    userId: MongooSchema.Types.ObjectId,
    hashedToken: string,
    expiresAt: Date
  ) {
    return this.userModel
      .findByIdAndUpdate(userId, {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: expiresAt
      })
      .exec()
  }

  async findByValidResetToken(hashedToken: string) {
    return this.userModel
      .findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: new Date() }
      })
      .exec()
  }

  async resetPassword(
    userId: MongooSchema.Types.ObjectId,
    newPassword: string
  ) {
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)
    return this.userModel
      .findByIdAndUpdate(userId, {
        password: hashedPassword,
        $unset: { resetPasswordToken: '', resetPasswordExpires: '' }
      })
      .exec()
  }
}

import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { UpdateTransactionInput } from './dto/update-transaction.input'
import { Transaction, TransactionDocument } from './entities/transaction.entity'

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>
  ) {}

  async createTransaction(
    createTransactionInput: CreateTransactionInput,
    owner: User
  ) {
    const createdTransaction = new this.transactionModel({
      ...createTransactionInput,
      owner: owner._id
    })

    return createdTransaction.save()
  }

  async findAllTransactions(currentUser: User) {
    const transactions = await this.transactionModel
      .find({ owner: currentUser._id })
      .populate('subscription')
      .exec()

    return transactions
  }

  async getTransactionById(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User
  ) {
    const transaction = await this.transactionModel
      .findById(id)
      .populate('subscription')
      .exec()

    if (!transaction) {
      return null
    }
    assertOwner(transaction.owner, currentUser)

    return transaction
  }

  async updateTransaction(
    id: MongooseSchema.Types.ObjectId,
    updateTransactionInput: UpdateTransactionInput,
    currentUser: User
  ) {
    const transaction = await this.transactionModel.findById(id).exec()
    if (!transaction) return null
    assertOwner(transaction.owner, currentUser)
    return this.transactionModel
      .findByIdAndUpdate(id, updateTransactionInput, { new: true })
      .exec()
  }

  async removeTransaction(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User
  ) {
    const transaction = await this.transactionModel.findById(id).exec()
    if (!transaction) return null
    assertOwner(transaction.owner, currentUser)
    return this.transactionModel.findByIdAndDelete(id).exec()
  }
}

import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateTransactionInput } from './dto/create-transaction.input'
import { UpdateTransactionInput } from './dto/update-transaction.input'
import { Transaction, TransactionDocument } from './entities/transaction.entity'

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>
  ) {}

  async createTransaction(createTransactionInput: CreateTransactionInput) {
    const createdTransaction = new this.transactionModel(createTransactionInput)

    return createdTransaction.save()
  }

  async findAllTransactions() {
    const transactions = await this.transactionModel
      .find()
      .populate('subscription')
      .exec()

    return transactions
  }

  async getTransactionById(id: MongooseSchema.Types.ObjectId) {
    const transaction = await this.transactionModel
      .findById(id)
      .populate('subscription')
      .exec()

    if (!transaction) {
      return null
    }

    return transaction
  }

  async updateTransaction(
    id: MongooseSchema.Types.ObjectId,
    updateTransactionInput: UpdateTransactionInput
  ) {
    return this.transactionModel
      .findByIdAndUpdate(id, updateTransactionInput, { new: true })
      .exec()
  }

  async removeTransaction(id: MongooseSchema.Types.ObjectId) {
    return this.transactionModel.findByIdAndDelete(id).exec()
  }
}

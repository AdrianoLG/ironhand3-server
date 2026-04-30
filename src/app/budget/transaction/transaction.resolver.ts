import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateTransactionInput } from './dto/create-transaction.input'
import { UpdateTransactionInput } from './dto/update-transaction.input'
import { Transaction } from './entities/transaction.entity'
import { TransactionService } from './transaction.service'

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput
  ) {
    return this.transactionService.createTransaction(createTransactionInput)
  }

  @Query(() => [Transaction], { name: 'transactions' })
  findAll() {
    return this.transactionService.findAllTransactions()
  }

  @Query(() => Transaction, { name: 'transaction' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.transactionService.getTransactionById(id)
  }

  @Mutation(() => Transaction)
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput
  ) {
    return this.transactionService.updateTransaction(
      updateTransactionInput._id,
      updateTransactionInput
    )
  }

  @Mutation(() => Transaction)
  removeTransaction(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.transactionService.removeTransaction(id)
  }
}

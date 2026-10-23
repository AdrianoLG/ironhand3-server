import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
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
    createTransactionInput: CreateTransactionInput,
    @CurrentUser() currentUser: User
  ) {
    return this.transactionService.createTransaction(
      createTransactionInput,
      currentUser
    )
  }

  @Query(() => [Transaction], { name: 'transactions' })
  findAll(@CurrentUser() currentUser: User) {
    return this.transactionService.findAllTransactions(currentUser)
  }

  @Query(() => Transaction, { name: 'transaction' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.transactionService.getTransactionById(id, currentUser)
  }

  @Mutation(() => Transaction)
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
    @CurrentUser() currentUser: User
  ) {
    return this.transactionService.updateTransaction(
      updateTransactionInput._id,
      updateTransactionInput,
      currentUser
    )
  }

  @Mutation(() => Transaction)
  removeTransaction(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.transactionService.removeTransaction(id, currentUser)
  }
}

import { Max, Min } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, Float, InputType, Int } from '@nestjs/graphql'

import {
  TransactionCategory,
  TransactionType
} from '../entities/transaction.entity'

@InputType()
export class CreateTransactionInput {
  @Field(() => String, { description: 'Transaction title' })
  title: string

  @Field(() => TransactionCategory, { description: 'Transaction category' })
  category: TransactionCategory

  @Field(() => TransactionType, { description: 'Transaction type' })
  type: TransactionType

  @Field(() => Int, { description: 'Month index from 0 to 11' })
  @Min(0)
  @Max(11)
  month: number

  @Field(() => Int, { description: 'Year for the transaction month' })
  year: number

  @Field(() => Float, { description: 'Expected amount' })
  expectedAmount: number

  @Field(() => Float, { description: 'Real amount', nullable: true })
  realAmount?: number

  @Field(() => Boolean, {
    description: 'Whether the transaction is paid',
    nullable: true
  })
  isPaid?: boolean

  @Field(() => String, { description: 'Subscription id', nullable: true })
  subscription?: MongoSchema.Types.ObjectId
}

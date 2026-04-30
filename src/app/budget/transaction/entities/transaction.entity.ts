import { Schema as MongoSchema } from 'mongoose'

import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Subscription } from '../../subscription/entities/subscription.entity'

export enum TransactionCategory {
  HOUSE = 'house',
  WORK = 'work',
  FOOD = 'food',
  VICE = 'vice',
  SHOP = 'shop',
  CAR = 'car',
  OTHER = 'other',
  HEALTH = 'health',
  MOTORCYCLE = 'motorcycle',
  TRAVEL = 'travel',
  MUSIC = 'music',
  EDUCATION = 'education'
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

registerEnumType(TransactionCategory, {
  name: 'TransactionCategory'
})

registerEnumType(TransactionType, {
  name: 'TransactionType'
})

@ObjectType()
@Schema()
export class Transaction {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Transaction title' })
  @Prop({ required: true })
  title: string

  @Field(() => TransactionCategory, { description: 'Transaction category' })
  @Prop({ required: true, enum: Object.values(TransactionCategory) })
  category: TransactionCategory

  @Field(() => TransactionType, { description: 'Transaction type' })
  @Prop({ required: true, enum: Object.values(TransactionType) })
  type: TransactionType

  @Field(() => Float, { description: 'Expected amount' })
  @Prop({ required: true })
  expectedAmount: number

  @Field(() => Float, {
    description: 'Real amount',
    nullable: true
  })
  @Prop()
  realAmount?: number

  @Field(() => Boolean, { description: 'Whether the transaction is paid' })
  @Prop({ default: false })
  isPaid: boolean

  @Field(() => Subscription, {
    description: 'Subscription id',
    nullable: true
  })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Subscription' })
  subscription?: Subscription | MongoSchema.Types.ObjectId
}

export type TransactionDocument = Transaction & Document
export const TransactionSchema = SchemaFactory.createForClass(Transaction)

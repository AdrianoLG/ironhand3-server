import { Schema as MongoSchema } from 'mongoose';

import { Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum SubscriptionFrequency {
  ANNUALLY = 'annually',
  BIMONTHLY = 'bimonthly',
  MONTHLY = 'monthly'
}

registerEnumType(SubscriptionFrequency, {
  name: 'SubscriptionFrequency'
})

@ObjectType()
@Schema()
export class Subscription {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => SubscriptionFrequency, {
    description: 'Subscription frequency'
  })
  @Prop({ required: true, enum: Object.values(SubscriptionFrequency) })
  frequency: SubscriptionFrequency

  @Field(() => Boolean, { description: 'Whether the subscription is a loan' })
  @Prop({ required: true })
  isLoan: boolean

  @Field(() => Int, { description: 'Day of month' })
  @Prop({ required: true })
  dayOfMonth: number

  @Field(() => Date, { description: 'Start date' })
  @Prop({ required: true })
  startDate: Date

  @Field(() => Date, { description: 'End date', nullable: true })
  @Prop()
  endDate?: Date

  @Field(() => Float, { description: 'Subscription amount' })
  @Prop({ required: true })
  amount: number

  @Field(() => Boolean, { description: 'Whether the subscription is active' })
  @Prop({ required: true })
  isActive: boolean
}

export type SubscriptionDocument = Subscription & Document
export const SubscriptionSchema = SchemaFactory.createForClass(Subscription)

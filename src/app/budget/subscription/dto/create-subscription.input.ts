import { Field, Float, InputType, Int } from '@nestjs/graphql'

import { SubscriptionFrequency } from '../entities/subscription.entity'

@InputType()
export class CreateSubscriptionInput {
  @Field(() => SubscriptionFrequency, {
    description: 'Subscription frequency'
  })
  frequency: SubscriptionFrequency

  @Field(() => Boolean, { description: 'Whether the subscription is a loan' })
  isLoan: boolean

  @Field(() => Int, { description: 'Day of month' })
  dayOfMonth: number

  @Field(() => Date, { description: 'Start date' })
  startDate: Date

  @Field(() => Date, { description: 'End date', nullable: true })
  endDate?: Date

  @Field(() => Float, { description: 'Subscription amount' })
  amount: number

  @Field(() => Boolean, { description: 'Whether the subscription is active' })
  isActive: boolean
}

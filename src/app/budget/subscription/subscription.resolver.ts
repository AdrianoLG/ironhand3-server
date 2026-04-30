import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateSubscriptionInput } from './dto/create-subscription.input'
import { UpdateSubscriptionInput } from './dto/update-subscription.input'
import { Subscription } from './entities/subscription.entity'
import { SubscriptionService } from './subscription.service'

@Resolver(() => Subscription)
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Mutation(() => Subscription)
  createSubscription(
    @Args('createSubscriptionInput')
    createSubscriptionInput: CreateSubscriptionInput
  ) {
    return this.subscriptionService.createSubscription(createSubscriptionInput)
  }

  @Query(() => [Subscription], { name: 'subscriptions' })
  findAll() {
    return this.subscriptionService.findAllSubscriptions()
  }

  @Query(() => Subscription, { name: 'subscription' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.subscriptionService.getSubscriptionById(id)
  }

  @Mutation(() => Subscription)
  updateSubscription(
    @Args('updateSubscriptionInput')
    updateSubscriptionInput: UpdateSubscriptionInput
  ) {
    return this.subscriptionService.updateSubscription(
      updateSubscriptionInput._id,
      updateSubscriptionInput
    )
  }

  @Mutation(() => Subscription)
  removeSubscription(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.subscriptionService.removeSubscription(id)
  }
}

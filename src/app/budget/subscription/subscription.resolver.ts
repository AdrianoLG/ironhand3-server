import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
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
    createSubscriptionInput: CreateSubscriptionInput,
    @CurrentUser() currentUser: User
  ) {
    return this.subscriptionService.createSubscription(
      createSubscriptionInput,
      currentUser
    )
  }

  @Query(() => [Subscription], { name: 'subscriptions' })
  findAll(@CurrentUser() currentUser: User) {
    return this.subscriptionService.findAllSubscriptions(currentUser)
  }

  @Query(() => Subscription, { name: 'subscription' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.subscriptionService.getSubscriptionById(id, currentUser)
  }

  @Mutation(() => Subscription)
  updateSubscription(
    @Args('updateSubscriptionInput')
    updateSubscriptionInput: UpdateSubscriptionInput,
    @CurrentUser() currentUser: User
  ) {
    return this.subscriptionService.updateSubscription(
      updateSubscriptionInput._id,
      updateSubscriptionInput,
      currentUser
    )
  }

  @Mutation(() => Subscription)
  removeSubscription(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.subscriptionService.removeSubscription(id, currentUser)
  }
}

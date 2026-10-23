import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { CreateSubscriptionInput } from './dto/create-subscription.input'
import { UpdateSubscriptionInput } from './dto/update-subscription.input'
import {
  Subscription,
  SubscriptionDocument
} from './entities/subscription.entity'

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>
  ) {}

  async createSubscription(
    createSubscriptionInput: CreateSubscriptionInput,
    owner: User
  ) {
    const createdSubscription = new this.subscriptionModel({
      ...createSubscriptionInput,
      owner: owner._id
    })

    return createdSubscription.save()
  }

  async findAllSubscriptions(currentUser: User) {
    return this.subscriptionModel.find({ owner: currentUser._id }).exec()
  }

  async getSubscriptionById(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User
  ) {
    const subscription = await this.subscriptionModel.findById(id).exec()
    if (!subscription) return null
    assertOwner(subscription.owner, currentUser)
    return subscription
  }

  async updateSubscription(
    id: MongooseSchema.Types.ObjectId,
    updateSubscriptionInput: UpdateSubscriptionInput,
    currentUser: User
  ) {
    const subscription = await this.subscriptionModel.findById(id).exec()
    if (!subscription) return null
    assertOwner(subscription.owner, currentUser)
    return this.subscriptionModel
      .findByIdAndUpdate(id, updateSubscriptionInput, { new: true })
      .exec()
  }

  async removeSubscription(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User
  ) {
    const subscription = await this.subscriptionModel.findById(id).exec()
    if (!subscription) return null
    assertOwner(subscription.owner, currentUser)
    return this.subscriptionModel.findByIdAndDelete(id).exec()
  }
}

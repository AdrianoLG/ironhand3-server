import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

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

  async createSubscription(createSubscriptionInput: CreateSubscriptionInput) {
    const createdSubscription = new this.subscriptionModel(
      createSubscriptionInput
    )

    return createdSubscription.save()
  }

  async findAllSubscriptions() {
    return this.subscriptionModel.find().exec()
  }

  async getSubscriptionById(id: MongooseSchema.Types.ObjectId) {
    return this.subscriptionModel.findById(id).exec()
  }

  async updateSubscription(
    id: MongooseSchema.Types.ObjectId,
    updateSubscriptionInput: UpdateSubscriptionInput
  ) {
    return this.subscriptionModel
      .findByIdAndUpdate(id, updateSubscriptionInput, { new: true })
      .exec()
  }

  async removeSubscription(id: MongooseSchema.Types.ObjectId) {
    return this.subscriptionModel.findByIdAndDelete(id).exec()
  }
}

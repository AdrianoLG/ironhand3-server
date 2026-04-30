import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import {
  Subscription,
  SubscriptionSchema
} from './entities/subscription.entity'
import { SubscriptionResolver } from './subscription.resolver'
import { SubscriptionService } from './subscription.service'

@Module({
  providers: [SubscriptionResolver, SubscriptionService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ]
})
export class SubscriptionModule {}

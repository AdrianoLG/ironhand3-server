import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { CompletedMealResolver } from './completed-meal.resolver'
import { CompletedMealService } from './completed-meal.service'
import {
  CompletedMeal,
  CompletedMealSchema
} from './entities/completed-meal.entity'

@Module({
  providers: [CompletedMealResolver, CompletedMealService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: CompletedMeal.name, schema: CompletedMealSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [CompletedMealService]
})
export class CompletedMealModule {}

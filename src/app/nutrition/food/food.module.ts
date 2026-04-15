import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Food, FoodSchema } from './entities/food.entity'
import { FoodResolver } from './food.resolver'
import { FoodService } from './food.service'

@Module({
  providers: [FoodResolver, FoodService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [FoodService]
})
export class FoodModule {}

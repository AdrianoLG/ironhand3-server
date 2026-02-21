import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Watering, WateringSchema } from './entities/watering.entity'
import { WateringResolver } from './watering.resolver'
import { WateringService } from './watering.service'

@Module({
  providers: [WateringResolver, WateringService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Watering.name, schema: WateringSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [WateringService]
})
export class WateringModule {}

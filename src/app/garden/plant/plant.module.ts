import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Plant, PlantSchema } from './entities/plant.entity'
import { PlantResolver } from './plant.resolver'
import { PlantService } from './plant.service'

@Module({
  providers: [PlantResolver, PlantService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [PlantService]
})
export class PlantModule {}

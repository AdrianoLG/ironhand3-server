import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Plant, PlantSchema } from '../plant/entities/plant.entity'
import { Specie, SpecieSchema } from './entities/specie.entity'
import { SpecieResolver } from './specie.resolver'
import { SpecieService } from './specie.service'

@Module({
  providers: [SpecieResolver, SpecieService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Specie.name, schema: SpecieSchema },
      { name: Plant.name, schema: PlantSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [SpecieService]
})
export class SpecieModule {}

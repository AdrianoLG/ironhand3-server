import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Fertilizer, FertilizerSchema } from './entities/fertilizer.entity'
import { FertilizerResolver } from './fertilizer.resolver'
import { FertilizerService } from './fertilizer.service'

@Module({
  providers: [FertilizerResolver, FertilizerService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Fertilizer.name, schema: FertilizerSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [FertilizerService]
})
export class FertilizerModule {}

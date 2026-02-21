import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { CropResolver } from './crop.resolver'
import { CropService } from './crop.service'
import { Crop, CropSchema } from './entities/crop.entity'

@Module({
  providers: [CropResolver, CropService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Crop.name, schema: CropSchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [CropService]
})
export class CropModule {}

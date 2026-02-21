import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { CropContainerResolver } from './crop-container.resolver'
import { CropContainerService } from './crop-container.service'
import {
  CropContainer,
  CropContainerSchema
} from './entities/crop-container.entity'

@Module({
  providers: [CropContainerResolver, CropContainerService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: CropContainer.name, schema: CropContainerSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [CropContainerService]
})
export class CropContainerModule {}

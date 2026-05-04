import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Serie, SerieSchema } from './entities/serie.entity'
import { SerieResolver } from './serie.resolver'
import { SerieService } from './serie.service'

@Module({
  providers: [SerieResolver, SerieService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Serie.name, schema: SerieSchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [SerieService]
})
export class SerieModule {}

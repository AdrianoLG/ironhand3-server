import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Genre, GenreSchema } from './entities/genre.entity'
import { GenreResolver } from './genre.resolver'
import { GenreService } from './genre.service'

@Module({
  providers: [GenreResolver, GenreService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [GenreService]
})
export class GenreModule {}

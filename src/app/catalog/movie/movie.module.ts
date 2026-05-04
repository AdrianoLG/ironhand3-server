import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Movie, MovieSchema } from './entities/movie.entity'
import { MovieResolver } from './movie.resolver'
import { MovieService } from './movie.service'

@Module({
  providers: [MovieResolver, MovieService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [MovieService]
})
export class MovieModule {}

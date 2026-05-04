import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateMovieInput } from './dto/create-movie.input'
import { UpdateMovieInput } from './dto/update-movie.input'
import { Movie } from './entities/movie.entity'
import { MovieService } from './movie.service'

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Mutation(() => Movie)
  createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
    return this.movieService.createMovie(createMovieInput)
  }

  @Query(() => [Movie], { name: 'movies' })
  findAll() {
    return this.movieService.findAllMovies()
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.movieService.getMovieById(id)
  }

  @Mutation(() => Movie)
  updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.movieService.updateMovie(updateMovieInput._id, updateMovieInput)
  }

  @Mutation(() => Movie)
  removeMovie(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.movieService.removeMovie(id)
  }
}

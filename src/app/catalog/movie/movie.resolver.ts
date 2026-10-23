import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CreateMovieInput } from './dto/create-movie.input'
import { UpdateMovieInput } from './dto/update-movie.input'
import { Movie } from './entities/movie.entity'
import { MovieService } from './movie.service'

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Mutation(() => Movie)
  createMovie(
    @Args('createMovieInput') createMovieInput: CreateMovieInput,
    @CurrentUser() currentUser: User
  ) {
    return this.movieService.createMovie(createMovieInput, currentUser)
  }

  @Query(() => [Movie], { name: 'movies' })
  findAll(
    @CurrentUser() currentUser: User,
    @Args('viewUserId', { type: () => String, nullable: true })
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    return this.movieService.findAllMovies(currentUser, viewUserId)
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User,
    @Args('viewUserId', { type: () => String, nullable: true })
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    return this.movieService.getMovieById(id, currentUser, viewUserId)
  }

  @Mutation(() => Movie)
  updateMovie(
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput,
    @CurrentUser() currentUser: User
  ) {
    return this.movieService.updateMovie(
      updateMovieInput._id,
      updateMovieInput,
      currentUser
    )
  }

  @Mutation(() => Movie)
  removeMovie(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.movieService.removeMovie(id, currentUser)
  }
}

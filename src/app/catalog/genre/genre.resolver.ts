import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateGenreInput } from './dto/create-genre.input'
import { UpdateGenreInput } from './dto/update-genre.input'
import { Genre } from './entities/genre.entity'
import { GenreService } from './genre.service'

@Resolver(() => Genre)
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  @Mutation(() => Genre)
  createGenre(@Args('createGenreInput') createGenreInput: CreateGenreInput) {
    return this.genreService.createGenre(createGenreInput)
  }

  @Query(() => [Genre], { name: 'genres' })
  findAll() {
    return this.genreService.findAllGenres()
  }

  @Query(() => Genre, { name: 'genre' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.genreService.getGenreById(id)
  }

  @Mutation(() => Genre)
  updateGenre(@Args('updateGenreInput') updateGenreInput: UpdateGenreInput) {
    return this.genreService.updateGenre(updateGenreInput._id, updateGenreInput)
  }

  @Mutation(() => Genre)
  removeGenre(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.genreService.removeGenre(id)
  }
}

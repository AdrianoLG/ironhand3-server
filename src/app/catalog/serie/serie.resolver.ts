import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateSerieInput } from './dto/create-serie.input'
import { UpdateSerieInput } from './dto/update-serie.input'
import { Serie } from './entities/serie.entity'
import { SerieService } from './serie.service'

@Resolver(() => Serie)
export class SerieResolver {
  constructor(private readonly serieService: SerieService) {}

  @Mutation(() => Serie)
  createSerie(@Args('createSerieInput') createSerieInput: CreateSerieInput) {
    return this.serieService.createSerie(createSerieInput)
  }

  @Query(() => [Serie], { name: 'series' })
  findAll() {
    return this.serieService.findAllSeries()
  }

  @Query(() => Serie, { name: 'serie' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.serieService.getSerieById(id)
  }

  @Mutation(() => Serie)
  updateSerie(@Args('updateSerieInput') updateSerieInput: UpdateSerieInput) {
    return this.serieService.updateSerie(updateSerieInput._id, updateSerieInput)
  }

  @Mutation(() => Serie)
  removeSerie(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.serieService.removeSerie(id)
  }
}

import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CreateSerieInput } from './dto/create-serie.input'
import { UpdateSerieInput } from './dto/update-serie.input'
import { Serie } from './entities/serie.entity'
import { SerieService } from './serie.service'

@Resolver(() => Serie)
export class SerieResolver {
  constructor(private readonly serieService: SerieService) {}

  @Mutation(() => Serie)
  createSerie(
    @Args('createSerieInput') createSerieInput: CreateSerieInput,
    @CurrentUser() currentUser: User
  ) {
    return this.serieService.createSerie(createSerieInput, currentUser)
  }

  @Query(() => [Serie], { name: 'series' })
  findAll(
    @CurrentUser() currentUser: User,
    @Args('viewUserId', { type: () => String, nullable: true })
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    return this.serieService.findAllSeries(currentUser, viewUserId)
  }

  @Query(() => Serie, { name: 'serie' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User,
    @Args('viewUserId', { type: () => String, nullable: true })
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    return this.serieService.getSerieById(id, currentUser, viewUserId)
  }

  @Mutation(() => Serie)
  updateSerie(
    @Args('updateSerieInput') updateSerieInput: UpdateSerieInput,
    @CurrentUser() currentUser: User
  ) {
    return this.serieService.updateSerie(
      updateSerieInput._id,
      updateSerieInput,
      currentUser
    )
  }

  @Mutation(() => Serie)
  removeSerie(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.serieService.removeSerie(id, currentUser)
  }
}

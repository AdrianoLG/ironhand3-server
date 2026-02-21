import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateWateringInput } from './dto/create-watering.input'
import { UpdateWateringInput } from './dto/update-watering.input'
import { Watering } from './entities/watering.entity'
import { WateringService } from './watering.service'

@Resolver(() => Watering)
export class WateringResolver {
  constructor(private readonly wateringService: WateringService) {}

  @Mutation(() => Watering)
  createWatering(
    @Args('createWateringInput') createWateringInput: CreateWateringInput
  ) {
    return this.wateringService.createWatering(createWateringInput)
  }

  @Query(() => [Watering], { name: 'waterings' })
  waterings() {
    return this.wateringService.findAllWaterings()
  }

  @Query(() => Watering, { name: 'watering' })
  watering(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.wateringService.getWateringById(id)
  }

  @Mutation(() => Watering)
  updateWatering(
    @Args('updateWateringInput') updateWateringInput: UpdateWateringInput
  ) {
    return this.wateringService.updateWatering(
      updateWateringInput._id,
      updateWateringInput
    )
  }

  @Mutation(() => Watering)
  removeWatering(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.wateringService.removeWatering(id)
  }
}

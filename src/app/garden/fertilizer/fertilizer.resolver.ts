import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateFertilizerInput } from './dto/create-fertilizer.input'
import { UpdateFertilizerInput } from './dto/update-fertilizer.input'
import { Fertilizer } from './entities/fertilizer.entity'
import { FertilizerService } from './fertilizer.service'

@Resolver(() => Fertilizer)
export class FertilizerResolver {
  constructor(private readonly fertilizerService: FertilizerService) {}

  @Mutation(() => Fertilizer)
  createFertilizer(
    @Args('createFertilizerInput') createFertilizerInput: CreateFertilizerInput
  ) {
    return this.fertilizerService.createFertilizer(createFertilizerInput)
  }

  @Query(() => [Fertilizer], { name: 'fertilizers' })
  fertilizers() {
    return this.fertilizerService.findAllFertilizers()
  }

  @Query(() => Fertilizer, { name: 'fertilizer' })
  fertilizer(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.fertilizerService.getFertilizerById(id)
  }

  @Mutation(() => Fertilizer)
  updateFertilizer(
    @Args('updateFertilizerInput') updateFertilizerInput: UpdateFertilizerInput
  ) {
    return this.fertilizerService.updateFertilizer(
      updateFertilizerInput._id,
      updateFertilizerInput
    )
  }

  @Mutation(() => Fertilizer)
  removeFertilizer(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.fertilizerService.removeFertilizer(id)
  }
}

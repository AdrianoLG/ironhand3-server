import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreatePlantInput } from './dto/create-plant.input'
import { UpdatePlantInput } from './dto/update-plant.input'
import { Plant } from './entities/plant.entity'
import { PlantService } from './plant.service'

@Resolver(() => Plant)
export class PlantResolver {
  constructor(private readonly plantService: PlantService) {}

  @Mutation(() => Plant)
  createPlant(@Args('createPlantInput') createPlantInput: CreatePlantInput) {
    return this.plantService.createPlant(createPlantInput)
  }

  @Query(() => [Plant], { name: 'plants' })
  plants() {
    return this.plantService.findAllPlants()
  }

  @Query(() => Plant, { name: 'plant' })
  plant(@Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId) {
    return this.plantService.getPlantById(id)
  }

  @Mutation(() => Plant)
  updatePlant(@Args('updatePlantInput') updatePlantInput: UpdatePlantInput) {
    return this.plantService.updatePlant(updatePlantInput._id, updatePlantInput)
  }

  @Mutation(() => Plant)
  removePlant(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.plantService.removePlant(id)
  }
}

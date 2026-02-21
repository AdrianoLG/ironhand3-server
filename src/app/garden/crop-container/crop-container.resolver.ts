import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CropContainerService } from './crop-container.service'
import { CreateCropContainerInput } from './dto/create-crop-container.input'
import { UpdateCropContainerInput } from './dto/update-crop-container.input'
import { CropContainer } from './entities/crop-container.entity'

@Resolver(() => CropContainer)
export class CropContainerResolver {
  constructor(private readonly cropContainerService: CropContainerService) {}

  @Mutation(() => CropContainer)
  createCropContainer(
    @Args('createCropContainerInput')
    createCropContainerInput: CreateCropContainerInput
  ) {
    return this.cropContainerService.createCropContainer(
      createCropContainerInput
    )
  }

  @Query(() => [CropContainer], { name: 'cropContainers' })
  cropContainers() {
    return this.cropContainerService.findAllCropContainers()
  }

  @Query(() => CropContainer, { name: 'cropContainer' })
  cropContainer(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.cropContainerService.getCropContainerById(id)
  }

  @Mutation(() => CropContainer)
  updateCropContainer(
    @Args('updateCropContainerInput')
    updateCropContainerInput: UpdateCropContainerInput
  ) {
    return this.cropContainerService.updateCropContainer(
      updateCropContainerInput._id,
      updateCropContainerInput
    )
  }

  @Mutation(() => CropContainer)
  removeCropContainer(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.cropContainerService.removeCropContainer(id)
  }
}

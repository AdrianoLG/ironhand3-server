import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CropService } from './crop.service'
import { CreateCropInput } from './dto/create-crop.input'
import { UpdateCropInput } from './dto/update-crop.input'
import { Crop } from './entities/crop.entity'

@Resolver(() => Crop)
export class CropResolver {
  constructor(private readonly cropService: CropService) {}

  @Mutation(() => Crop)
  createCrop(@Args('createCropInput') createCropInput: CreateCropInput) {
    return this.cropService.createCrop(createCropInput)
  }

  @Query(() => [Crop], { name: 'crops' })
  crops() {
    return this.cropService.findAllCrops()
  }

  @Query(() => Crop, { name: 'crop' })
  crop(@Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId) {
    return this.cropService.getCropById(id)
  }

  @Mutation(() => Crop)
  updateCrop(@Args('updateCropInput') updateCropInput: UpdateCropInput) {
    return this.cropService.updateCrop(updateCropInput._id, updateCropInput)
  }

  @Mutation(() => Crop)
  removeCrop(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.cropService.removeCrop(id)
  }
}

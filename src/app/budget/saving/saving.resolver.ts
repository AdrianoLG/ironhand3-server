import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateSavingInput } from './dto/create-saving.input'
import { UpdateSavingInput } from './dto/update-saving.input'
import { Saving } from './entities/saving.entity'
import { SavingService } from './saving.service'

@Resolver(() => Saving)
export class SavingResolver {
  constructor(private readonly savingService: SavingService) {}

  @Mutation(() => Saving)
  createSaving(
    @Args('createSavingInput') createSavingInput: CreateSavingInput
  ) {
    return this.savingService.createSaving(createSavingInput)
  }

  @Query(() => [Saving], { name: 'savings' })
  findAll() {
    return this.savingService.findAllSavings()
  }

  @Query(() => Saving, { name: 'saving' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.savingService.getSavingById(id)
  }

  @Mutation(() => Saving)
  updateSaving(
    @Args('updateSavingInput') updateSavingInput: UpdateSavingInput
  ) {
    return this.savingService.updateSaving(
      updateSavingInput._id,
      updateSavingInput
    )
  }

  @Mutation(() => Saving)
  removeSaving(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.savingService.removeSaving(id)
  }
}

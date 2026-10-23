import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CreateSavingInput } from './dto/create-saving.input'
import { UpdateSavingInput } from './dto/update-saving.input'
import { Saving } from './entities/saving.entity'
import { SavingService } from './saving.service'

@Resolver(() => Saving)
export class SavingResolver {
  constructor(private readonly savingService: SavingService) {}

  @Mutation(() => Saving)
  createSaving(
    @Args('createSavingInput') createSavingInput: CreateSavingInput,
    @CurrentUser() currentUser: User
  ) {
    return this.savingService.createSaving(createSavingInput, currentUser)
  }

  @Query(() => [Saving], { name: 'savings' })
  findAll(@CurrentUser() currentUser: User) {
    return this.savingService.findAllSavings(currentUser)
  }

  @Query(() => Saving, { name: 'saving' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.savingService.getSavingById(id, currentUser)
  }

  @Mutation(() => Saving)
  updateSaving(
    @Args('updateSavingInput') updateSavingInput: UpdateSavingInput,
    @CurrentUser() currentUser: User
  ) {
    return this.savingService.updateSaving(
      updateSavingInput._id,
      updateSavingInput,
      currentUser
    )
  }

  @Mutation(() => Saving)
  removeSaving(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.savingService.removeSaving(id, currentUser)
  }
}

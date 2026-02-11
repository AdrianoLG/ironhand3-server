import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateRehearsalInput } from './dto/create-rehearsal.input'
import { UpdateRehearsalInput } from './dto/update-rehearsal.input'
import { Rehearsal } from './entities/rehearsal.entity'
import { RehearsalService } from './rehearsal.service'

@Resolver(() => Rehearsal)
export class RehearsalResolver {
  constructor(private readonly rehearsalService: RehearsalService) {}

  @Mutation(() => Rehearsal)
  createRehearsal(
    @Args('createRehearsalInput') createRehearsalInput: CreateRehearsalInput
  ) {
    return this.rehearsalService.createRehearsal(createRehearsalInput)
  }

  @Query(() => [Rehearsal], { name: 'rehearsals' })
  findAll() {
    return this.rehearsalService.findAllRehearsals()
  }

  @Query(() => Rehearsal, { name: 'rehearsal' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.rehearsalService.getRehearsalById(id)
  }

  @Mutation(() => Rehearsal)
  updateRehearsal(
    @Args('updateRehearsalInput') updateRehearsalInput: UpdateRehearsalInput
  ) {
    return this.rehearsalService.updateRehearsal(
      updateRehearsalInput._id,
      updateRehearsalInput
    )
  }

  @Mutation(() => Rehearsal)
  removeRehearsal(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.rehearsalService.removeRehearsal(id)
  }
}

import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CreateRehearsalInput } from './dto/create-rehearsal.input'
import { UpdateRehearsalInput } from './dto/update-rehearsal.input'
import { Rehearsal } from './entities/rehearsal.entity'
import { RehearsalService } from './rehearsal.service'

@Resolver(() => Rehearsal)
export class RehearsalResolver {
  constructor(private readonly rehearsalService: RehearsalService) {}

  @Mutation(() => Rehearsal)
  createRehearsal(
    @Args('createRehearsalInput') createRehearsalInput: CreateRehearsalInput,
    @CurrentUser() currentUser: User
  ) {
    return this.rehearsalService.createRehearsal(
      createRehearsalInput,
      currentUser
    )
  }

  @Query(() => [Rehearsal], { name: 'rehearsals' })
  findAll(@CurrentUser() currentUser: User) {
    return this.rehearsalService.findAllRehearsals(currentUser)
  }

  @Query(() => Rehearsal, { name: 'rehearsal' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.rehearsalService.getRehearsalById(id, currentUser)
  }

  @Mutation(() => Rehearsal)
  updateRehearsal(
    @Args('updateRehearsalInput') updateRehearsalInput: UpdateRehearsalInput,
    @CurrentUser() currentUser: User
  ) {
    return this.rehearsalService.updateRehearsal(
      updateRehearsalInput._id,
      updateRehearsalInput,
      currentUser
    )
  }

  @Mutation(() => Rehearsal)
  removeRehearsal(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.rehearsalService.removeRehearsal(id, currentUser)
  }
}

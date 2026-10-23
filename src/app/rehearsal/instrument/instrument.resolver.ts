import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CreateInstrumentInput } from './dto/create-instrument.input'
import { UpdateInstrumentInput } from './dto/update-instrument.input'
import { Instrument } from './entities/instrument.entity'
import { InstrumentService } from './instrument.service'

@Resolver(() => Instrument)
export class InstrumentResolver {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Mutation(() => Instrument)
  createInstrument(
    @Args('createInstrumentInput') createInstrumentInput: CreateInstrumentInput,
    @CurrentUser() currentUser: User
  ) {
    return this.instrumentService.createInstrument(
      createInstrumentInput,
      currentUser
    )
  }

  @Query(() => [Instrument], { name: 'instruments' })
  findAll(@CurrentUser() currentUser: User) {
    return this.instrumentService.findAllInstruments(currentUser)
  }

  @Query(() => Instrument, { name: 'instrument' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.instrumentService.getInstrumentById(id, currentUser)
  }

  @Mutation(() => Instrument)
  updateInstrument(
    @Args('updateInstrumentInput') updateInstrumentInput: UpdateInstrumentInput,
    @CurrentUser() currentUser: User
  ) {
    return this.instrumentService.updateInstrument(
      updateInstrumentInput._id,
      updateInstrumentInput,
      currentUser
    )
  }

  @Mutation(() => Instrument)
  removeInstrument(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.instrumentService.removeInstrument(id, currentUser)
  }
}

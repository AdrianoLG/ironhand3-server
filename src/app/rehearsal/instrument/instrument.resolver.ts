import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateInstrumentInput } from './dto/create-instrument.input'
import { UpdateInstrumentInput } from './dto/update-instrument.input'
import { Instrument } from './entities/instrument.entity'
import { InstrumentService } from './instrument.service'

@Resolver(() => Instrument)
export class InstrumentResolver {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Mutation(() => Instrument)
  createInstrument(
    @Args('createInstrumentInput') createInstrumentInput: CreateInstrumentInput
  ) {
    return this.instrumentService.createInstrument(createInstrumentInput)
  }

  @Query(() => [Instrument], { name: 'instruments' })
  findAll() {
    return this.instrumentService.findAllInstruments()
  }

  @Query(() => Instrument, { name: 'instrument' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.instrumentService.getInstrumentById(id)
  }

  @Mutation(() => Instrument)
  updateInstrument(
    @Args('updateInstrumentInput') updateInstrumentInput: UpdateInstrumentInput
  ) {
    return this.instrumentService.updateInstrument(
      updateInstrumentInput._id,
      updateInstrumentInput
    )
  }

  @Mutation(() => Instrument)
  removeInstrument(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.instrumentService.removeInstrument(id)
  }
}

import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateSpecieInput } from './dto/create-specie.input'
import { UpdateSpecieInput } from './dto/update-specie.input'
import { Specie } from './entities/specie.entity'
import { SpecieService } from './specie.service'

@Resolver(() => Specie)
export class SpecieResolver {
  constructor(private readonly specieService: SpecieService) {}

  @Mutation(() => Specie)
  createSpecie(
    @Args('createSpecieInput') createSpecieInput: CreateSpecieInput
  ) {
    return this.specieService.createSpecie(createSpecieInput)
  }

  @Query(() => [Specie], { name: 'species' })
  species() {
    return this.specieService.findAllSpecies()
  }

  @Query(() => Specie, { name: 'specie' })
  specie(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.specieService.getSpecieById(id)
  }

  @Mutation(() => Specie)
  updateSpecie(
    @Args('updateSpecieInput') updateSpecieInput: UpdateSpecieInput
  ) {
    return this.specieService.updateSpecie(
      updateSpecieInput._id,
      updateSpecieInput
    )
  }

  @Mutation(() => Specie)
  removeSpecie(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.specieService.removeSpecie(id)
  }
}

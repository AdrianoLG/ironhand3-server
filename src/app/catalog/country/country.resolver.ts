import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CountryService } from './country.service'
import { CreateCountryInput } from './dto/create-country.input'
import { UpdateCountryInput } from './dto/update-country.input'
import { Country } from './entities/country.entity'

@Resolver(() => Country)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Mutation(() => Country)
  createCountry(
    @Args('createCountryInput') createCountryInput: CreateCountryInput
  ) {
    return this.countryService.createCountry(createCountryInput)
  }

  @Query(() => [Country], { name: 'countries' })
  findAll() {
    return this.countryService.findAllCountries()
  }

  @Query(() => Country, { name: 'country' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.countryService.getCountryById(id)
  }

  @Mutation(() => Country)
  updateCountry(
    @Args('updateCountryInput') updateCountryInput: UpdateCountryInput
  ) {
    return this.countryService.updateCountry(
      updateCountryInput._id,
      updateCountryInput
    )
  }

  @Mutation(() => Country)
  removeCountry(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.countryService.removeCountry(id)
  }
}

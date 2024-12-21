import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateHeaderInput } from './dto/create-header.input'
import { UpdateHeaderInput } from './dto/update-header.input'
import { Header } from './entities/header.entity'
import { HeaderService } from './header.service'

@Resolver(() => Header)
export class HeaderResolver {
  constructor(private readonly headerService: HeaderService) {}

  @Mutation(() => Header)
  createHeader(
    @Args('createHeaderInput') createHeaderInput: CreateHeaderInput
  ) {
    return this.headerService.createHeader(createHeaderInput)
  }

  @Query(() => [Header], { name: 'headers' })
  findAllHeaders() {
    return this.headerService.findAllHeaders()
  }

  @Query(() => Header, { name: 'header' })
  getHeaderById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.headerService.getHeaderById(id)
  }

  @Mutation(() => Header)
  updateHeader(
    @Args('updateHeaderInput') updateHeaderInput: UpdateHeaderInput
  ) {
    return this.headerService.updateHeader(
      updateHeaderInput._id,
      updateHeaderInput
    )
  }

  @Mutation(() => Header)
  removeHeader(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.headerService.removeHeader(id)
  }
}

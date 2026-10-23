import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CreateSheetInput } from './dto/create-sheet.input'
import { UpdateSheetInput } from './dto/update-sheet.input'
import { Sheet } from './entities/sheet.entity'
import { SheetService } from './sheet.service'

@Resolver(() => Sheet)
export class SheetResolver {
  constructor(private readonly sheetService: SheetService) {}

  @Mutation(() => Sheet)
  createSheet(
    @Args('createSheetInput') createSheetInput: CreateSheetInput,
    @CurrentUser() currentUser: User
  ) {
    return this.sheetService.createSheet(createSheetInput, currentUser)
  }

  @Query(() => [Sheet], { name: 'sheets' })
  findAll(@CurrentUser() currentUser: User) {
    return this.sheetService.findAllSheets(currentUser)
  }

  @Query(() => Sheet, { name: 'sheet' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.sheetService.getSheetById(id, currentUser)
  }

  @Mutation(() => Sheet)
  updateSheet(
    @Args('updateSheetInput') updateSheetInput: UpdateSheetInput,
    @CurrentUser() currentUser: User
  ) {
    return this.sheetService.updateSheet(
      updateSheetInput._id,
      updateSheetInput,
      currentUser
    )
  }

  @Mutation(() => Sheet)
  removeSheet(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.sheetService.removeSheet(id, currentUser)
  }
}

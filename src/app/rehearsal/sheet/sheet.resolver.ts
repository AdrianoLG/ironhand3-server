import { Schema as MongooseSchema } from 'mongoose'

import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateSheetInput } from './dto/create-sheet.input'
import { UpdateSheetInput } from './dto/update-sheet.input'
import { Sheet } from './entities/sheet.entity'
import { SheetService } from './sheet.service'

@Resolver(() => Sheet)
export class SheetResolver {
  constructor(private readonly sheetService: SheetService) {}

  @Mutation(() => Sheet)
  createSheet(@Args('createSheetInput') createSheetInput: CreateSheetInput) {
    return this.sheetService.createSheet(createSheetInput)
  }

  @Query(() => [Sheet], { name: 'sheets' })
  findAll() {
    return this.sheetService.findAllSheets()
  }

  @Query(() => Sheet, { name: 'sheet' })
  findOne(@Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId) {
    return this.sheetService.getSheetById(id)
  }

  @Mutation(() => Sheet)
  updateSheet(@Args('updateSheetInput') updateSheetInput: UpdateSheetInput) {
    return this.sheetService.updateSheet(updateSheetInput._id, updateSheetInput)
  }

  @Mutation(() => Sheet)
  removeSheet(
    @Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.sheetService.removeSheet(id)
  }
}

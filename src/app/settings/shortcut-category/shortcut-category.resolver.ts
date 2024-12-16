import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateShortcutCategoryInput, UpdateShortcutCategoryInput } from './dto'
import { ShortcutCategory } from './entities/shortcut-category.entity'
import { ShortcutCategoryService } from './shortcut-category.service'

@Resolver(() => ShortcutCategory)
export class ShortcutCategoryResolver {
  constructor(
    private readonly shortcutCategoryService: ShortcutCategoryService
  ) {}

  @Mutation(() => ShortcutCategory)
  createShortcutCategory(
    @Args('createShortcutCategoryInput')
    createShortcutCategoryInput: CreateShortcutCategoryInput
  ) {
    return this.shortcutCategoryService.createShortcutCategory(
      createShortcutCategoryInput
    )
  }

  @Query(() => [ShortcutCategory], { name: 'shortcutCategories' })
  findAllShortcutCategories() {
    return this.shortcutCategoryService.findAllShortcutCategories()
  }

  @Query(() => ShortcutCategory, { name: 'shortcutCategory' })
  getShortcutCategoryById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.shortcutCategoryService.getShortcutCategoryById(id)
  }

  @Mutation(() => ShortcutCategory)
  updateShortcutCategory(
    @Args('updateShortcutCategoryInput')
    updateShortcutCategoryInput: UpdateShortcutCategoryInput
  ) {
    return this.shortcutCategoryService.updateShortcutCategoryInput(
      updateShortcutCategoryInput._id,
      updateShortcutCategoryInput
    )
  }

  @Mutation(() => ShortcutCategory)
  removeShortcutCategory(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.shortcutCategoryService.removeShortcutCategory(id)
  }
}

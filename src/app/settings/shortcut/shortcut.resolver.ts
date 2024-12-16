import { Schema as MongooseSchema } from 'mongoose'
import { ResponseType } from 'src/app/types/response.types'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateShortcutInput } from './dto/create-shortcut.input'
import { UpdateShortcutInput } from './dto/update-shortcut.input'
import { Shortcut } from './entities/shortcut.entity'
import { ShortcutService } from './shortcut.service'

@Resolver(() => Shortcut)
export class ShortcutResolver {
  constructor(private readonly shortcutsService: ShortcutService) {}

  @Mutation(() => Shortcut)
  createShortcut(
    @Args('createShortcutInput') createShortcutInput: CreateShortcutInput
  ) {
    return this.shortcutsService.createShortcut(createShortcutInput)
  }

  @Query(() => [Shortcut], { name: 'shortcuts' })
  findAll() {
    return this.shortcutsService.findAllShortcuts()
  }

  @Query(() => Shortcut, { name: 'shortcut' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.shortcutsService.getShortcutById(id)
  }

  @Mutation(() => Shortcut)
  updateShortcut(
    @Args('updateShortcutInput') updateShortcutInput: UpdateShortcutInput
  ) {
    return this.shortcutsService.updateShortcut(
      updateShortcutInput._id,
      updateShortcutInput
    )
  }

  @Mutation(() => ResponseType)
  async removeShortcut(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    const removedShortcut = await this.shortcutsService.removeShortcut(id)
    return {
      message: `Shortcut removed successfully`,
      count: removedShortcut.deletedCount
    }
  }
}

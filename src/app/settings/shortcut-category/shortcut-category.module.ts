import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Shortcut, ShortcutSchema } from '../shortcut/entities/shortcut.entity'
import {
  ShortcutCategory,
  ShortcutCategorySchema
} from './entities/shortcut-category.entity'
import { ShortcutCategoryResolver } from './shortcut-category.resolver'
import { ShortcutCategoryService } from './shortcut-category.service'

@Module({
  providers: [ShortcutCategoryResolver, ShortcutCategoryService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: ShortcutCategory.name, schema: ShortcutCategorySchema },
      { name: Shortcut.name, schema: ShortcutSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [ShortcutCategoryService]
})
export class ShortcutCategoryModule {}

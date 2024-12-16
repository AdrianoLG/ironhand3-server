import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import {
  ShortcutCategory,
  ShortcutCategorySchema
} from '../shortcut-category/entities/shortcut-category.entity'
import { Shortcut, ShortcutSchema } from './entities/shortcut.entity'
import { ShortcutResolver } from './shortcut.resolver'
import { ShortcutService } from './shortcut.service'

@Module({
  providers: [ShortcutResolver, ShortcutService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Shortcut.name, schema: ShortcutSchema },
      { name: ShortcutCategory.name, schema: ShortcutCategorySchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [ShortcutService]
})
export class ShortcutsModule {}

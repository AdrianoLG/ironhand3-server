import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Recipe, RecipeSchema } from './entities/recipe.entity'
import { RecipeResolver } from './recipe.resolver'
import { RecipeService } from './recipe.service'

@Module({
  providers: [RecipeResolver, RecipeService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [RecipeService]
})
export class RecipeModule {}

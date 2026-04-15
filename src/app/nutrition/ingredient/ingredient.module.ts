import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Ingredient, IngredientSchema } from './entities/ingredient.entity'
import { IngredientResolver } from './ingredient.resolver'
import { IngredientService } from './ingredient.service'

@Module({
  providers: [IngredientResolver, IngredientService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [IngredientService]
})
export class IngredientModule {}

import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateShortcutCategoryInput } from './create-shortcut-category.input'

@InputType()
export class UpdateShortcutCategoryInput extends PartialType(
  CreateShortcutCategoryInput
) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateShortcutInput } from './create-shortcut.input'

@InputType()
export class UpdateShortcutInput extends PartialType(CreateShortcutInput) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

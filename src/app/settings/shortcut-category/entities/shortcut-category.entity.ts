import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Shortcut } from '../../shortcut/entities/shortcut.entity'

@ObjectType()
@Schema()
export class ShortcutCategory {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Title of the category' })
  @Prop({ required: true, unique: true })
  title: string

  @Field(() => [Shortcut], {
    description: 'List of shortcuts ids',
    nullable: false,
    defaultValue: []
  })
  @Prop({ type: [{ type: MongoSchema.Types.ObjectId, ref: 'Shortcut' }] })
  shortcuts: Shortcut[]
}

export type ShortcutCategoryDocument = ShortcutCategory & Document
export const ShortcutCategorySchema =
  SchemaFactory.createForClass(ShortcutCategory)

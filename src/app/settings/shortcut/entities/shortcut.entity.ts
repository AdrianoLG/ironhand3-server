import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { ShortcutCategory } from '../../shortcut-category/entities/shortcut-category.entity'

@ObjectType()
@Schema()
export class Shortcut {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Shortcut title' })
  @Prop({ required: true })
  title: string

  @Field(() => String, { description: 'Shortcut subtitle', nullable: true })
  @Prop()
  subtitle?: string

  @Field(() => String, { description: 'Shortcut image' })
  @Prop({ required: true })
  image: string

  @Field(() => ShortcutCategory, { description: 'Shortcut category' })
  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'ShortcutCategory',
    required: true
  })
  category: string

  @Field(() => String, { description: 'Shortcut action' })
  @Prop({ required: true })
  action: string
}

export type ShortcutDocument = Shortcut & Document
export const ShortcutSchema = SchemaFactory.createForClass(Shortcut)

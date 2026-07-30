import { Schema as MongoSchema } from 'mongoose';

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ collection: 'notes' })
export class Note {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Note title' })
  @Prop({ required: true, trim: true, maxlength: 50 })
  title: string

  @Field(() => String, { description: 'WYSIWYG content' })
  @Prop({ required: true })
  content: string

  @Field(() => [String], { description: 'Tags', nullable: true })
  @Prop({ type: [String], default: [] })
  tags?: string[]

  @Field(() => String, { description: 'Category', nullable: true })
  @Prop({ trim: true, maxlength: 50 })
  category?: string

  @Field(() => [String], { description: 'Image names/urls', nullable: true })
  @Prop({ type: [String], default: [] })
  images?: string[]
}

export type NoteDocument = Note & Document
export const NoteSchema = SchemaFactory.createForClass(Note)

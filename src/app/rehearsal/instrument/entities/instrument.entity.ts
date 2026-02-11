import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class Instrument {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Instrument name' })
  @Prop({ required: true })
  name: string

  @Field(() => String, { description: 'Slug for the instrument' })
  @Prop({ required: true })
  slug: string

  @Field(() => String, { description: 'Image for the instrument' })
  @Prop({ required: true })
  img: string
}

export type InstrumentDocument = Instrument & Document
export const InstrumentSchema = SchemaFactory.createForClass(Instrument)

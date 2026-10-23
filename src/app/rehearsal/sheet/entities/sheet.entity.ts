import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { User } from '../../../user/entities/user.entity'
import { Instrument } from '../../instrument/entities/instrument.entity'

@ObjectType()
@Schema()
export class Sheet {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => User, { description: 'Owner of the sheet' })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User', required: true })
  owner: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Sheet title' })
  @Prop({ required: true })
  title: string

  @Field(() => String, { description: 'Artist name' })
  @Prop()
  artist: string

  @Field(() => [Instrument], { description: 'Possible instruments used' })
  @Prop({
    type: [MongoSchema.Types.ObjectId],
    ref: 'Instrument',
    required: true
  })
  possibleInstruments?: Instrument[]
}

export type SheetDocument = Sheet & Document
export const SheetSchema = SchemaFactory.createForClass(Sheet)

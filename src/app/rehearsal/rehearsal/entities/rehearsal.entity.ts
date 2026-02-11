import { Schema as MongoSchema } from 'mongoose'

import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Instrument } from '../../instrument/entities/instrument.entity'
import { Sheet } from '../../sheet/entities/sheet.entity'

@ObjectType()
export class RehearsalSheet {
  @Field(() => Sheet, { description: 'Sheet' })
  sheet: Sheet | MongoSchema.Types.ObjectId

  @Field(() => Int, { description: 'Duration in minutes' })
  duration: number
}

@ObjectType()
@Schema()
export class Rehearsal {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => Instrument, { description: 'Instrument' })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Instrument', required: true })
  instrument: Instrument | MongoSchema.Types.ObjectId

  @Field(() => Date, { description: 'Completed at' })
  @Prop({ required: true })
  completedAt: Date

  @Field(() => [RehearsalSheet], { description: 'Sheets' })
  @Prop({
    type: [
      {
        sheet: {
          type: MongoSchema.Types.ObjectId,
          ref: 'Sheet',
          required: true
        },
        duration: { type: Number, required: true }
      }
    ],
    default: []
  })
  sheets: { sheet: MongoSchema.Types.ObjectId; duration: number }[]
}

export type RehearsalDocument = Rehearsal & Document
export const RehearsalSchema = SchemaFactory.createForClass(Rehearsal)

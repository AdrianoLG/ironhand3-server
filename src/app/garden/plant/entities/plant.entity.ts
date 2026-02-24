import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Specie } from '../../specie/entities/specie.entity'

export enum PlantDeathCause {
  UNBORN = 'unborn',
  IRRIGATION = 'irrigation',
  HARVESTED = 'harvested',
  OVERFERTILIZATION = 'overfertilization',
  WEATHER = 'weather',
  OTHER = 'other'
}

registerEnumType(PlantDeathCause, {
  name: 'PlantDeathCause'
})

@ObjectType()
export class PlantDeath {
  @Field(() => Date, { description: 'Death date' })
  date: Date

  @Field(() => PlantDeathCause, { description: 'Death cause' })
  cause: PlantDeathCause
}

@ObjectType()
@Schema()
export class Plant {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Plant name' })
  @Prop({ required: true })
  name: string

  @Field(() => Specie, { description: 'Specie' })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Specie', required: true })
  specie: Specie | MongoSchema.Types.ObjectId

  @Field(() => Date, { description: 'Planted date' })
  @Prop({ required: true })
  planted: Date

  @Field(() => [Date], { description: 'Bloom dates', nullable: true })
  @Prop({ type: [Date], default: [] })
  inBloom?: Date[]

  @Field(() => [Date], { description: 'Harvested dates', nullable: true })
  @Prop({ type: [Date], default: [] })
  harvested?: Date[]

  @Field(() => PlantDeath, { description: 'Death info', nullable: true })
  @Prop({
    type: {
      date: { type: Date, required: true },
      cause: {
        type: String,
        enum: Object.values(PlantDeathCause),
        required: true
      }
    },
    required: false
  })
  death?: { date: Date; cause: PlantDeathCause }
}

export type PlantDocument = Plant & Document
export const PlantSchema = SchemaFactory.createForClass(Plant)

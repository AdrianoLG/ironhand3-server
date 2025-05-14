import { Schema as MongoSchema } from 'mongoose'

import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Exercise } from '../../exercise/entities/exercise.entity'

@ObjectType()
@Schema()
export class CompletedExercise {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => Date, { description: 'Date in which exercise was completed' })
  @Prop({ required: true })
  date: Date

  @Field(() => Exercise, { description: 'Exercise' })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Exercise', required: true })
  exercise: string

  @Field(() => String, {
    description: 'Time to complete exercise in minutes',
    nullable: true
  })
  @Prop()
  time?: number

  @Field(() => Int, { description: 'Exercise repetitions', nullable: true })
  @Prop()
  repetitions?: number

  @Field(() => Int, {
    description: 'Weight involved in kilograms',
    nullable: true
  })
  @Prop()
  weight?: number

  @Field(() => Int, {
    description: 'Maximum of PPM doing the exercise',
    nullable: true
  })
  @Prop()
  ppm_max?: number

  @Field(() => Int, {
    description: 'Minimum of PPM doing the exercise',
    nullable: true
  })
  @Prop()
  ppm_min?: number
}

export type CompletedExerciseDocument = CompletedExercise & Document
export const CompletedExerciseSchema =
  SchemaFactory.createForClass(CompletedExercise)

import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { User } from '../../../user/entities/user.entity'

@ObjectType()
@Schema()
export class Exercise {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => User, { description: 'Owner of the exercise' })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User', required: true })
  owner: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Exercise name' })
  @Prop({ required: true })
  name: string

  @Field(() => [String], { description: 'Body parts involved', nullable: true })
  @Prop()
  bodyParts?: string[]

  @Field(() => String, {
    description: 'Exercise type: strength, cardio or stretch'
  })
  @Prop({ required: true })
  type: string

  @Field(() => String, { description: 'Exercise image', nullable: true })
  @Prop()
  img?: string
}

export type ExerciseDocument = Exercise & Document
export const ExerciseSchema = SchemaFactory.createForClass(Exercise)

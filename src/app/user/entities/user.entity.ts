import { Document, Schema as MongoSchema } from 'mongoose'

import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Email of the user' })
  @Prop({ required: true, unique: true })
  email: string

  // Nunca se expone en el schema GraphQL
  @HideField()
  @Prop({ required: true })
  password: string

  @Field(() => String, { description: 'Name of the user', nullable: true })
  @Prop()
  name?: string

  // Hash del token de recuperación de contraseña, nunca expuesto en GraphQL
  @HideField()
  @Prop()
  resetPasswordToken?: string

  @HideField()
  @Prop()
  resetPasswordExpires?: Date
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)

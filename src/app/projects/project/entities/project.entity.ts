import { Schema as MongoSchema } from 'mongoose';

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Task } from '../../task/entities/task.entity';

@ObjectType()
@Schema()
export class Project {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Project title' })
  @Prop({ required: true })
  title: string

  @Field(() => String, { description: 'Project description', nullable: true })
  @Prop()
  description?: string

  @Field(() => Boolean, { description: 'Whether project is shared' })
  @Prop({ default: false })
  shared: boolean

  @Field(() => String, { description: 'Project category' })
  @Prop({ required: true })
  category: string

  @Field(() => [Task], {
    description: 'Tasks belonging to this project',
    nullable: true
  })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Task', default: [] })
  tasks?: Task[]
}

export type ProjectDocument = Project & Document
export const ProjectSchema = SchemaFactory.createForClass(Project)

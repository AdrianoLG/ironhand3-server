import { Schema as MongoSchema } from 'mongoose';

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from '../../../user/entities/user.entity';
import { Project } from '../../project/entities/project.entity';

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum TaskStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done'
}

registerEnumType(TaskPriority, {
  name: 'TaskPriority'
})

registerEnumType(TaskStatus, {
  name: 'TaskStatus'
})

@ObjectType()
@Schema({ _id: false })
export class TaskSubtask {
  @Field(() => String, { description: 'Subtask title' })
  @Prop({ required: true })
  title: string

  @Field(() => Boolean, { description: 'Whether the subtask is completed' })
  @Prop({ default: false })
  completed: boolean
}

export const TaskSubtaskSchema = SchemaFactory.createForClass(TaskSubtask)

@ObjectType()
@Schema()
export class Task {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Task title' })
  @Prop({ required: true })
  title: string

  @Field(() => String, { description: 'Task description', nullable: true })
  @Prop()
  description?: string

  @Field(() => [TaskSubtask], { description: 'Subtasks', nullable: true })
  @Prop({ type: [TaskSubtaskSchema], default: [] })
  subtasks?: TaskSubtask[]

  @Field(() => User, { description: 'Assigned user', nullable: true })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User' })
  asignedTo?: User | MongoSchema.Types.ObjectId

  @Field(() => Project, { description: 'Project that owns this task' })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Project', required: true })
  project: Project | MongoSchema.Types.ObjectId

  @Field(() => TaskPriority, { description: 'Task priority' })
  @Prop({
    required: true,
    enum: Object.values(TaskPriority),
    default: TaskPriority.MEDIUM
  })
  priority: TaskPriority

  @Field(() => [String], { description: 'Task tags', nullable: true })
  @Prop({ type: [String], default: [] })
  tags?: string[]

  @Field(() => TaskStatus, { description: 'Task status' })
  @Prop({
    required: true,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO
  })
  status: TaskStatus

  @Field(() => Boolean, { description: 'Whether the task is completed' })
  @Prop({ default: false })
  completed: boolean
}

export type TaskDocument = Task & Document
export const TaskSchema = SchemaFactory.createForClass(Task)

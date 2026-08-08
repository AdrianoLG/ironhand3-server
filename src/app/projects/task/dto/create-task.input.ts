import { Schema as MongoSchema } from 'mongoose';

import { Field, InputType } from '@nestjs/graphql';

import { TaskPriority, TaskStatus } from '../entities/task.entity';

@InputType()
export class CreateTaskSubtaskInput {
  @Field(() => String, { description: 'Subtask title' })
  title: string

  @Field(() => Boolean, {
    description: 'Whether the subtask is completed',
    nullable: true
  })
  completed?: boolean
}

@InputType()
export class CreateTaskInput {
  @Field(() => String, { description: 'Task title' })
  title: string

  @Field(() => String, { description: 'Task description', nullable: true })
  description?: string

  @Field(() => [CreateTaskSubtaskInput], {
    description: 'Subtasks',
    nullable: true
  })
  subtasks?: CreateTaskSubtaskInput[]

  @Field(() => String, { description: 'Assigned user id', nullable: true })
  asignedTo?: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Project id that owns this task' })
  project: MongoSchema.Types.ObjectId

  @Field(() => TaskPriority, { description: 'Task priority', nullable: true })
  priority?: TaskPriority

  @Field(() => [String], { description: 'Task tags', nullable: true })
  tags?: string[]

  @Field(() => TaskStatus, { description: 'Task status', nullable: true })
  status?: TaskStatus

  @Field(() => Boolean, {
    description: 'Whether the task is completed',
    nullable: true
  })
  completed?: boolean
}

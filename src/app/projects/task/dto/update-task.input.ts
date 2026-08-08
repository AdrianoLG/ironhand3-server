import { IsMongoId } from 'class-validator';
import { Schema as MongoSchema } from 'mongoose';

import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateTaskInput } from './create-task.input';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

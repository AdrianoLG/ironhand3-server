import { IsMongoId } from 'class-validator';
import { Schema as MongoSchema } from 'mongoose';

import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateProjectInput } from './create-project.input';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}

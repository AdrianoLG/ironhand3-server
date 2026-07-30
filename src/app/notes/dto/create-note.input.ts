import { MaxLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @Field(() => String, { description: 'Note title' })
  @MaxLength(50)
  title: string

  @Field(() => String, { description: 'WYSIWYG content' })
  content: string

  @Field(() => [String], { description: 'Tags', nullable: true })
  tags?: string[]

  @Field(() => String, { description: 'Category', nullable: true })
  @MaxLength(50)
  category?: string

  @Field(() => [String], { description: 'Image names/urls', nullable: true })
  images?: string[]
}

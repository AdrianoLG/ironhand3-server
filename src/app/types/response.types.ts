import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Response type' })
export class ResponseType {
  @Field(() => String, { description: 'Response message' })
  message: string

  @Field(() => Int, { description: 'Count of completed operations' })
  count: number
}

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateRoomInput {
  @Field(() => String, { description: 'Room name' })
  name: string

  @Field(() => String, { description: 'Room slug' })
  slug: string

  @Field(() => String, { description: 'Room image' })
  image: string
}

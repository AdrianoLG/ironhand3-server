import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateExerciseInput {
  @Field(() => String, { description: 'Exercise name' })
  name: string

  @Field(() => [String], { description: 'Body parts involved' })
  bodyParts?: string[]

  @Field(() => String, {
    description: 'Exercise type: strength, cardio or stretch'
  })
  type: string

  @Field(() => String, { description: 'Exercise image' })
  img?: string
}

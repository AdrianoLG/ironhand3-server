import { Field, Float, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGoalInput {
  @Field(() => String, { description: 'Goal title' })
  title: string

  @Field(() => Float, { description: 'Target amount' })
  targetAmount: number
}

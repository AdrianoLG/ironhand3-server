import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGoalInput {
  @Field(() => String, { description: 'Goal title' })
  title: string

  @Field(() => Float, { description: 'Target amount' })
  targetAmount: number

  @Field(() => Boolean, {
    description: 'Whether the goal is completed',
    nullable: true
  })
  isCompleted?: boolean

  @Field(() => Date, { description: 'Completion date', nullable: true })
  completedAt?: Date
}

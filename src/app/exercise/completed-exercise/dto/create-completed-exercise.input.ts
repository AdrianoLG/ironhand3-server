import { Schema as MongooSchema } from 'mongoose'

import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateCompletedExerciseInput {
  @Field(() => String, { description: 'Exercise id' })
  exercise: MongooSchema.Types.ObjectId

  @Field(() => Date, { description: 'Date in which exercise was completed' })
  date: Date

  @Field(() => Int, {
    description: 'Time to complete exercise in minutes',
    nullable: true
  })
  time?: number

  @Field(() => Int, { description: 'Exercise repetitions', nullable: true })
  repetitions?: number

  @Field(() => Int, {
    description: 'Weight involved in kilograms',
    nullable: true
  })
  weight?: number

  @Field(() => Int, {
    description: 'Maximum of PPM doing the exercise',
    nullable: true
  })
  ppm_max?: number

  @Field(() => Int, {
    description: 'Minimum of PPM doing the exercise',
    nullable: true
  })
  ppm_min?: number
}

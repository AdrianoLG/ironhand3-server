import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCropInput {
  @Field(() => Date, { description: 'Start date' })
  startDate: Date

  @Field(() => Date, { description: 'End date' })
  endDate: Date

  @Field(() => [String], { description: 'Plant IDs', nullable: true })
  plants?: string[]

  @Field(() => [String], { description: 'Gallery', nullable: true })
  gallery?: string[]

  @Field(() => String, { description: 'CropContainer ID' })
  cropContainer: string
}

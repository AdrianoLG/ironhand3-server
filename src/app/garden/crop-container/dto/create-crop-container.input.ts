import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateCropContainerInput {
  @Field(() => String, { description: 'Crop container name' })
  name: string

  @Field(() => String, { description: 'Image for the crop container' })
  img: string

  @Field(() => Int, { description: 'Capacity' })
  capacity: number

  @Field(() => Boolean, { description: 'Automatic mode' })
  auto: boolean
}

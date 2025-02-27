import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateFileUploadInput {
  @IsNotEmpty()
  @IsString()
  path: string

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  caption: string
}

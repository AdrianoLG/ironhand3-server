import { Injectable } from '@nestjs/common'

import { CreateFileUploadInput } from './dto/create-file-upload.input'

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File, dto: CreateFileUploadInput) {
    return {
      statusCode: 201,
      message: 'File uploaded successfully',
      data: {
        image: file.filename,
        caption: dto.caption
      }
    }
  }
}

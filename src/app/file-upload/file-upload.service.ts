import { Injectable } from '@nestjs/common'

import { CreateFileUploadInput } from './dto/create-file-upload.input'

@Injectable()
export class FileUploadService {
  uploadFile(file: Express.Multer.File, dto: CreateFileUploadInput) {
    const fileUrl = process.env.UPLOADS_URI + '/' + file.filename
    return {
      statusCode: 201,
      message: 'File uploaded successfully',
      data: {
        image: fileUrl,
        caption: dto.caption
      }
    }
  }
}

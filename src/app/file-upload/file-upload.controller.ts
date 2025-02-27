import { diskStorage } from 'multer'

import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { FILE_UPLOADS_DIR } from './constants'
import { CreateFileUploadInput } from './dto/create-file-upload.input'
import { FileUploadService } from './file-upload.service'
import { fileFilter, fileNameEditor } from './utils'

@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: fileNameEditor,
        destination: FILE_UPLOADS_DIR
      }),
      limits: {
        fileSize: 1024 * 1024 * 1 // 1MB
      },
      fileFilter: fileFilter
    })
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFileUploadInput
  ) {
    return this.fileUploadService.uploadFile(file, dto)
  }
}

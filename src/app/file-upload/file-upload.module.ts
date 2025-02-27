import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'

import { FILE_UPLOADS_DIR } from './constants'
import { FileUploadController } from './file-upload.controller'
import { FileUploadService } from './file-upload.service'

@Module({
  imports: [
    MulterModule.register({
      dest: FILE_UPLOADS_DIR,
      limits: {
        fileSize: 1024 * 1024 * 1 // 1MB
      }
    })
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService]
})
export class FileUploadModule {}

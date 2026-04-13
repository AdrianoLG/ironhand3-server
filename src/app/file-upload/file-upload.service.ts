import { join, parse, posix } from 'path'
import * as sharp from 'sharp'

import { Injectable, Logger } from '@nestjs/common'

import { CreateFileUploadInput } from './dto/create-file-upload.input'

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name)

  async uploadFile(file: Express.Multer.File, dto: CreateFileUploadInput) {
    let thumbnail: string | undefined

    const thumbnailFlag = (dto.createThumbnail || '').toLowerCase()
    const shouldCreateThumbnail =
      thumbnailFlag === 'true' ||
      thumbnailFlag === '1' ||
      thumbnailFlag === 'yes'

    if (shouldCreateThumbnail) {
      const absoluteFileParts = parse(file.path)
      const normalizedRelative = file.filename.replace(/\\/g, '/')
      const relativeFileParts = posix.parse(normalizedRelative)

      const thumbnailRelativePath = posix.join(
        relativeFileParts.dir,
        `${relativeFileParts.name}-sm${relativeFileParts.ext}`
      )

      const thumbnailAbsolutePath = join(
        absoluteFileParts.dir,
        `${absoluteFileParts.name}-sm${absoluteFileParts.ext}`
      )

      try {
        await sharp(file.path)
          .resize(500, 500, {
            fit: 'cover',
            position: 'centre'
          })
          .toFile(thumbnailAbsolutePath)

        thumbnail = thumbnailRelativePath
      } catch (error) {
        try {
          const fallbackRelativePath = posix.join(
            relativeFileParts.dir,
            `${relativeFileParts.name}-sm.webp`
          )
          const fallbackAbsolutePath = join(
            absoluteFileParts.dir,
            `${absoluteFileParts.name}-sm.webp`
          )

          await sharp(file.path)
            .resize(500, 500, {
              fit: 'cover',
              position: 'centre'
            })
            .webp({ quality: 82 })
            .toFile(fallbackAbsolutePath)

          thumbnail = fallbackRelativePath
        } catch (fallbackError) {
          this.logger.error(
            `Thumbnail generation failed for ${file.filename}`,
            error instanceof Error ? error.stack : String(error)
          )
          this.logger.error(
            `Thumbnail fallback failed for ${file.filename}`,
            fallbackError instanceof Error
              ? fallbackError.stack
              : String(fallbackError)
          )
        }
      }
    }

    return {
      statusCode: 201,
      message: 'File uploaded successfully',
      data: {
        image: file.filename,
        thumbnail,
        caption: dto.caption
      }
    }
  }
}

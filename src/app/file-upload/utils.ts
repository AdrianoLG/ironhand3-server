import { Request } from 'express'

import { BadRequestException } from '@nestjs/common'

export const fileNameEditor = (
  req: Request,
  file: any,
  cb: (error: any, filename) => void
) => {
  const now = new Date()
  const uniqueSuffix =
    now.getDate().toString() +
    (now.getMonth() + 1) +
    now.getFullYear() +
    now.getHours() +
    now.getMinutes() +
    now.getSeconds()
  const fileName = req.body.name
    ? req.body.name + '.' + file.originalname.split('.').pop()
    : file.originalname

  cb(null, `${req.body.path}/${uniqueSuffix}-${fileName}`)
}

export const fileFilter = (
  req: Request,
  file: any,
  cb: (error: any, valid: boolean) => void
) => {
  if (!req.body.path) {
    return cb(new BadRequestException('Path is required!'), false)
  }

  if (
    !file.originalname
      .toLowerCase()
      .match(/\.(jpg|jpeg|png|gif|svg|avif|webp)$/)
  ) {
    return cb(new BadRequestException('Only image files are allowed!'), false)
  }

  cb(null, true)
}

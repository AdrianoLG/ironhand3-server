import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import { join } from 'path'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: [process.env.ALLOWED_HOSTS],
    credentials: true
  })
  app.use(cookieParser())
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')))
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()

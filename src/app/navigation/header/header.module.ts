import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Header, HeaderSchema } from './entities/header.entity'
import { HeaderResolver } from './header.resolver'
import { HeaderService } from './header.service'

@Module({
  providers: [HeaderResolver, HeaderService],
  imports: [
    MongooseModule.forFeature([{ name: Header.name, schema: HeaderSchema }])
  ],
  exports: [HeaderService]
})
export class HeaderModule {}

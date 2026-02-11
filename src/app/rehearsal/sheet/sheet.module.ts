import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import {
  Rehearsal,
  RehearsalSchema
} from '../rehearsal/entities/rehearsal.entity'
import { Sheet, SheetSchema } from './entities/sheet.entity'
import { SheetResolver } from './sheet.resolver'
import { SheetService } from './sheet.service'

@Module({
  providers: [SheetResolver, SheetService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Sheet.name, schema: SheetSchema },
      { name: Rehearsal.name, schema: RehearsalSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [SheetService]
})
export class SheetModule {}

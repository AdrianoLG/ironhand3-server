import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Room, RoomSchema } from './entities/room.entity'
import { RoomsResolver } from './rooms.resolver'
import { RoomsService } from './rooms.service'

@Module({
  providers: [RoomsResolver, RoomsService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [RoomsService]
})
export class RoomsModule {}

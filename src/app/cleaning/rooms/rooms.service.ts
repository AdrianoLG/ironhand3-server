import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateRoomInput } from './dto/create-room.input'
import { UpdateRoomInput } from './dto/update-room.input'
import { Room, RoomDocument } from './entities/room.entity'

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<RoomDocument>
  ) {}
  createRoom(createRoomInput: CreateRoomInput) {
    const createdRoom = new this.roomModel(createRoomInput)
    return createdRoom.save()
  }

  findAllRooms() {
    return this.roomModel.find().exec()
  }

  getRoomById(id: MongooseSchema.Types.ObjectId) {
    return this.roomModel.findById(id)
  }

  updateRoom(
    id: MongooseSchema.Types.ObjectId,
    updateRoomInput: UpdateRoomInput
  ) {
    return this.roomModel.findByIdAndUpdate(id, updateRoomInput, {
      new: true
    })
  }

  removeRoom(id: MongooseSchema.Types.ObjectId) {
    return this.roomModel.findByIdAndDelete(id)
  }
}

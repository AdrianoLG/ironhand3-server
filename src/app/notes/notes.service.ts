import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwnerUnlessShared } from '../common/utils/assert-owner.util'
import { User } from '../user/entities/user.entity'
import { CreateNoteInput } from './dto/create-note.input'
import { UpdateNoteInput } from './dto/update-note.input'
import { Note, NoteDocument } from './entities/note.entity'

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private noteModel: Model<NoteDocument>
  ) {}

  async createNote(createNoteInput: CreateNoteInput, owner: User) {
    const createdNote = new this.noteModel({
      ...createNoteInput,
      owner: owner._id
    })
    await createdNote.save()
    return createdNote.populate('owner')
  }

  async findAllNotes(currentUser: User) {
    return this.noteModel
      .find({ $or: [{ owner: currentUser._id }, { shared: true }] })
      .populate('owner')
      .exec()
  }

  async getNoteById(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const note = await this.noteModel.findById(id).exec()
    if (!note) return null
    assertOwnerUnlessShared(note, currentUser)
    return note.populate('owner')
  }

  async findDistinctCategories() {
    const categories = await this.noteModel.distinct('category', {
      category: { $nin: [null, ''] }
    })

    return categories
      .map((category) => category.trim())
      .filter((category) => category.length > 0)
  }

  async updateNote(
    id: MongooseSchema.Types.ObjectId,
    updateNoteInput: UpdateNoteInput,
    currentUser: User
  ) {
    const note = await this.noteModel.findById(id).exec()
    if (!note) return null
    assertOwnerUnlessShared(note, currentUser)
    return this.noteModel
      .findByIdAndUpdate(id, updateNoteInput, {
        new: true
      })
      .populate('owner')
      .exec()
  }

  async removeNote(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const note = await this.noteModel.findById(id).exec()
    if (!note) return null
    assertOwnerUnlessShared(note, currentUser)
    return this.noteModel.findByIdAndDelete(id).exec()
  }
}

import { Model, Schema as MongooseSchema } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { Note, NoteDocument } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private noteModel: Model<NoteDocument>
  ) {}

  async createNote(createNoteInput: CreateNoteInput) {
    const createdNote = new this.noteModel(createNoteInput)
    return createdNote.save()
  }

  async findAllNotes() {
    return this.noteModel.find().exec()
  }

  async getNoteById(id: MongooseSchema.Types.ObjectId) {
    return this.noteModel.findById(id).exec()
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
    updateNoteInput: UpdateNoteInput
  ) {
    return this.noteModel
      .findByIdAndUpdate(id, updateNoteInput, {
        new: true
      })
      .exec()
  }

  async removeNote(id: MongooseSchema.Types.ObjectId) {
    return this.noteModel.findByIdAndDelete(id).exec()
  }
}

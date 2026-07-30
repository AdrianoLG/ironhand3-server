import { Schema as MongooseSchema } from 'mongoose';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { Note } from './entities/note.entity';
import { NotesService } from './notes.service';

@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Mutation(() => Note)
  createNote(@Args('createNoteInput') createNoteInput: CreateNoteInput) {
    return this.notesService.createNote(createNoteInput)
  }

  @Query(() => [Note], { name: 'notes' })
  findAllNotes() {
    return this.notesService.findAllNotes()
  }

  @Query(() => Note, { name: 'note' })
  getNoteById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.notesService.getNoteById(id)
  }

  @Query(() => [String], { name: 'noteCategories' })
  findDistinctNoteCategories() {
    return this.notesService.findDistinctCategories()
  }

  @Mutation(() => Note)
  updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.notesService.updateNote(updateNoteInput._id, updateNoteInput)
  }

  @Mutation(() => Note)
  removeNote(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.notesService.removeNote(id)
  }
}

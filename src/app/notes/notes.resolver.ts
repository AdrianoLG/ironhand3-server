import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../user/entities/user.entity'
import { CreateNoteInput } from './dto/create-note.input'
import { UpdateNoteInput } from './dto/update-note.input'
import { Note } from './entities/note.entity'
import { NotesService } from './notes.service'

@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Mutation(() => Note)
  createNote(
    @Args('createNoteInput') createNoteInput: CreateNoteInput,
    @CurrentUser() currentUser: User
  ) {
    return this.notesService.createNote(createNoteInput, currentUser)
  }

  @Query(() => [Note], { name: 'notes' })
  findAllNotes(@CurrentUser() currentUser: User) {
    return this.notesService.findAllNotes(currentUser)
  }

  @Query(() => Note, { name: 'note' })
  getNoteById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.notesService.getNoteById(id, currentUser)
  }

  @Query(() => [String], { name: 'noteCategories' })
  findDistinctNoteCategories() {
    return this.notesService.findDistinctCategories()
  }

  @Mutation(() => Note)
  updateNote(
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput,
    @CurrentUser() currentUser: User
  ) {
    return this.notesService.updateNote(
      updateNoteInput._id,
      updateNoteInput,
      currentUser
    )
  }

  @Mutation(() => Note)
  removeNote(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.notesService.removeNote(id, currentUser)
  }
}

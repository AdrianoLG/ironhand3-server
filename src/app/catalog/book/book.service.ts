import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { CreateBookInput } from './dto/create-book.input'
import { UpdateBookInput } from './dto/update-book.input'
import { Book, BookDocument } from './entities/book.entity'

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<BookDocument>
  ) {}

  async createBook(createBookInput: CreateBookInput, owner: User) {
    const createdBook = new this.bookModel({
      ...createBookInput,
      owner: owner._id
    })
    return createdBook.save()
  }

  async findAllBooks(
    currentUser: User,
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    return this.bookModel
      .find({ owner: viewUserId ?? currentUser._id })
      .sort({ title: 1 })
      .populate('author')
      .populate('genres')
      .populate('owner')
      .exec()
  }

  async getBookById(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User,
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    const book = await this.bookModel.findById(id).exec()
    if (!book) return null
    const targetOwnerId = viewUserId ?? currentUser._id
    assertOwner(book.owner, { _id: targetOwnerId } as User)
    return book.populate(['author', 'genres', 'owner'])
  }

  async updateBook(
    id: MongooseSchema.Types.ObjectId,
    updateBookInput: UpdateBookInput,
    currentUser: User
  ) {
    const book = await this.bookModel.findById(id).exec()
    if (!book) return null
    assertOwner(book.owner, currentUser)
    return this.bookModel
      .findByIdAndUpdate(id, updateBookInput, { new: true })
      .populate('author')
      .populate('genres')
      .populate('owner')
      .exec()
  }

  async removeBook(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const book = await this.bookModel.findById(id).exec()
    if (!book) return null
    assertOwner(book.owner, currentUser)
    return this.bookModel.findByIdAndDelete(id).exec()
  }
}

import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateBookInput } from './dto/create-book.input'
import { UpdateBookInput } from './dto/update-book.input'
import { Book, BookDocument } from './entities/book.entity'

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<BookDocument>
  ) {}

  async createBook(createBookInput: CreateBookInput) {
    const createdBook = new this.bookModel(createBookInput)
    return createdBook.save()
  }

  async findAllBooks() {
    return this.bookModel
      .find()
      .sort({ title: 1 })
      .populate('author')
      .populate('genres')
      .exec()
  }

  async getBookById(id: MongooseSchema.Types.ObjectId) {
    return this.bookModel
      .findById(id)
      .populate('author')
      .populate('genres')
      .exec()
  }

  async updateBook(
    id: MongooseSchema.Types.ObjectId,
    updateBookInput: UpdateBookInput
  ) {
    return this.bookModel
      .findByIdAndUpdate(id, updateBookInput, { new: true })
      .populate('author')
      .populate('genres')
      .exec()
  }

  async removeBook(id: MongooseSchema.Types.ObjectId) {
    return this.bookModel.findByIdAndDelete(id).exec()
  }
}

import { Model, Schema as MongooSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Author, AuthorDocument } from '../author/entities/author.entity'
import { CreateBookInput } from './dto/create-book.input'
import { UpdateBookInput } from './dto/update-book.input'
import { Book, BookDocument } from './entities/book.entity'

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<BookDocument>,
    @InjectModel(Author.name)
    private authorModel: Model<AuthorDocument>
  ) {}

  async createBook(createBookInput: CreateBookInput) {
    const createdBook = new this.bookModel(createBookInput)
    createBookInput.authors.map(async (authorId) => {
      await this.authorModel
        .findByIdAndUpdate(
          authorId,
          { $push: { books: createdBook._id } },
          { new: true }
        )
        .exec()
    })
    return createdBook.save()
  }

  async findAllBooks(limit: number, skip: number) {
    const booksCount = await this.bookModel.countDocuments().exec()
    const bookList = await this.bookModel
      .find()
      .populate('authors')
      .skip(skip)
      .limit(limit)
      .exec()

    return { bookList, booksCount }
  }

  async getBookById(id: MongooSchema.Types.ObjectId) {
    return this.bookModel.findById(id).populate('author').exec()
  }

  async updateBook(
    id: MongooSchema.Types.ObjectId,
    updateBookInput: UpdateBookInput
  ) {
    return this.bookModel
      .findByIdAndUpdate(id, updateBookInput, { new: true })
      .exec()
  }

  async removeBook(id: MongooSchema.Types.ObjectId) {
    return this.bookModel.deleteOne({ _id: id }).exec()
  }
}

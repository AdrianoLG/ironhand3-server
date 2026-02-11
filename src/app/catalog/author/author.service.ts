import { Model, Schema as MongooSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Book, BookDocument } from '../book/entities/book.entity'
import { CreateAuthorInput } from './dto/create-author.input'
import { UpdateAuthorInput } from './dto/update-author.input'
import { Author, AuthorDocument } from './entities/author.entity'

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name)
    private authorModel: Model<AuthorDocument>,
    @InjectModel(Book.name)
    private bookModel: Model<BookDocument>
  ) {}

  async createAuthor(createAuthorInput: CreateAuthorInput) {
    const createdAuthor = new this.authorModel(createAuthorInput)
    createAuthorInput.books.map(async (bookId) => {
      await this.bookModel
        .findByIdAndUpdate(
          bookId,
          { $push: { authors: createdAuthor._id } },
          { new: true }
        )
        .exec()
    })
    return createdAuthor.save()
  }

  async findAllAuthors(limit: number, skip: number) {
    const authorsCount = await this.authorModel.countDocuments().exec()
    const authorList = await this.authorModel
      .find()
      .populate('books')
      .skip(skip)
      .limit(limit)
      .exec()

    return { authorList, authorsCount }
  }

  async getAuthorById(id: MongooSchema.Types.ObjectId) {
    return this.authorModel.findById(id).exec()
  }

  async updateAuthor(
    id: MongooSchema.Types.ObjectId,
    updateAuthorInput: UpdateAuthorInput
  ) {
    return this.authorModel
      .findByIdAndUpdate(id, updateAuthorInput, {
        new: true
      })
      .exec()
  }

  async removeAuthor(id: MongooSchema.Types.ObjectId) {
    return this.authorModel.deleteOne({ _id: id }).exec()
  }
}

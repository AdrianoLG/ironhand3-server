/// <reference types="jest" />
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { BookService } from './book.service'

describe('BookService', () => {
  let service: BookService
  let mockBookModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockBookModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newBook',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newBook', ...dto })
    }))

    const findExec = jest.fn().mockResolvedValue([{ _id: 'b1' }])
    const findChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: findExec
    }

    const findByIdExec = jest.fn().mockResolvedValue({ _id: 'bid' })
    const findByIdChain = {
      populate: jest.fn().mockReturnThis(),
      exec: findByIdExec
    }

    const updateExec = jest.fn().mockResolvedValue({ _id: 'upd' })
    const updateChain = {
      populate: jest.fn().mockReturnThis(),
      exec: updateExec
    }

    mockBookModel.find = jest.fn().mockReturnValue(findChain)
    mockBookModel.findById = jest.fn().mockReturnValue(findByIdChain)
    mockBookModel.findByIdAndUpdate = jest.fn().mockReturnValue(updateChain)
    mockBookModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: getModelToken('Book'), useValue: mockBookModel }
      ]
    }).compile()

    service = module.get<BookService>(BookService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createBook should create and save', async () => {
    const res = await service.createBook({ title: 'Dune' } as any)
    expect(res).toEqual({ _id: 'newBook', title: 'Dune' })
    expect(mockBookModel).toHaveBeenCalledWith({ title: 'Dune' })
  })

  it('findAllBooks should sort and populate author/genres', async () => {
    const res = await service.findAllBooks()
    expect(res).toEqual([{ _id: 'b1' }])
    expect(mockBookModel.find).toHaveBeenCalled()
    expect(mockBookModel.find().sort).toHaveBeenCalledWith({ title: 1 })
    expect(mockBookModel.find().populate).toHaveBeenNthCalledWith(1, 'author')
    expect(mockBookModel.find().populate).toHaveBeenNthCalledWith(2, 'genres')
  })

  it('getBookById should call findById and populate author/genres', async () => {
    const res = await service.getBookById('id' as any)
    expect(res).toEqual({ _id: 'bid' })
    expect(mockBookModel.findById).toHaveBeenCalledWith('id')
    expect(mockBookModel.findById().populate).toHaveBeenNthCalledWith(
      1,
      'author'
    )
    expect(mockBookModel.findById().populate).toHaveBeenNthCalledWith(
      2,
      'genres'
    )
  })

  it('updateBook should call findByIdAndUpdate and populate author/genres', async () => {
    const res = await service.updateBook('u1' as any, { title: 'Upd' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockBookModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { title: 'Upd' },
      { new: true }
    )
    expect(mockBookModel.findByIdAndUpdate().populate).toHaveBeenNthCalledWith(
      1,
      'author'
    )
    expect(mockBookModel.findByIdAndUpdate().populate).toHaveBeenNthCalledWith(
      2,
      'genres'
    )
  })

  it('removeBook should call findByIdAndDelete', async () => {
    const res = await service.removeBook('b1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockBookModel.findByIdAndDelete).toHaveBeenCalledWith('b1')
  })
})

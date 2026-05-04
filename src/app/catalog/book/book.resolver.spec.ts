/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing'

import { BookResolver } from './book.resolver'
import { BookService } from './book.service'

describe('BookResolver', () => {
  let resolver: BookResolver
  let service: BookService

  const mockService = {
    createBook: jest.fn(),
    findAllBooks: jest.fn(),
    getBookById: jest.fn(),
    updateBook: jest.fn(),
    removeBook: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookResolver, { provide: BookService, useValue: mockService }]
    }).compile()

    resolver = module.get<BookResolver>(BookResolver)
    service = module.get<BookService>(BookService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createBook should delegate to service', async () => {
    const input = { title: 'Dune', pages: 500 } as any
    const created = { _id: 'b1', ...input }
    ;(service.createBook as jest.Mock).mockResolvedValue(created)

    const result = await resolver.createBook(input)

    expect(service.createBook).toHaveBeenCalledWith(input)
    expect(result).toEqual(created)
  })

  it('findAll should return books from service', async () => {
    const list = [{ _id: 'b1', title: 'Dune' }]
    ;(service.findAllBooks as jest.Mock).mockResolvedValue(list)

    const result = await resolver.findAll()

    expect(service.findAllBooks).toHaveBeenCalled()
    expect(result).toEqual(list)
  })

  it('findOne should fetch a book by id', async () => {
    const book = { _id: 'b9', title: 'It' }
    ;(service.getBookById as jest.Mock).mockResolvedValue(book)

    const result = await resolver.findOne('b9' as any)

    expect(service.getBookById).toHaveBeenCalledWith('b9')
    expect(result).toEqual(book)
  })

  it('updateBook should use _id from input', async () => {
    const input = { _id: 'u1', title: 'Updated' } as any
    const updated = { _id: 'u1', title: 'Updated' }
    ;(service.updateBook as jest.Mock).mockResolvedValue(updated)

    const result = await resolver.updateBook(input)

    expect(service.updateBook).toHaveBeenCalledWith('u1', input)
    expect(result).toEqual(updated)
  })

  it('removeBook should delegate to service', async () => {
    const removed = { _id: 'r1' }
    ;(service.removeBook as jest.Mock).mockResolvedValue(removed)

    const result = await resolver.removeBook('r1' as any)

    expect(service.removeBook).toHaveBeenCalledWith('r1')
    expect(result).toEqual(removed)
  })
})

import { Test, TestingModule } from '@nestjs/testing'

import { BookResolver } from './book.resolver'
import { BookService } from './book.service'

describe('BookResolver', () => {
  let resolver: BookResolver

  let service: BookService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookResolver,
        {
          provide: BookService,
          useValue: {
            createBook: jest.fn(),
            findAllBooks: jest.fn(),
            getBookById: jest.fn(),
            updateBook: jest.fn(),
            removeBook: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<BookResolver>(BookResolver)
    service = module.get<BookService>(BookService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAllBooks should pass args to service', async () => {
    const response = { bookList: [], booksCount: 0 } as any
    ;(service.findAllBooks as jest.Mock).mockResolvedValue(response)
    const result = await resolver.findAllBooks({ limit: 20, skip: 3 } as any)
    expect(result).toEqual(response)
    expect(service.findAllBooks).toHaveBeenCalledWith(20, 3)
  })

  it('getBookById should delegate', async () => {
    const book = { _id: 'b1', title: 'X' } as any
    ;(service.getBookById as jest.Mock).mockResolvedValue(book)
    const result = await resolver.getBookById('b1' as any)
    expect(result).toEqual(book)
    expect(service.getBookById).toHaveBeenCalledWith('b1')
  })

  it('createBook should delegate', async () => {
    const input = { title: 'New' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createBook as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createBook(input)
    expect(result).toEqual(created)
    expect(service.createBook).toHaveBeenCalledWith(input)
  })

  it('updateBook should delegate', async () => {
    const update = { _id: 'u1', title: 'Upd' } as any
    const updated = { _id: 'u1', title: 'Upd' } as any
    ;(service.updateBook as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateBook(update)
    expect(result).toEqual(updated)
    expect(service.updateBook).toHaveBeenCalledWith('u1', update)
  })

  it('removeBook should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeBook as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeBook('r1' as any)
    expect(result).toEqual(removed)
    expect(service.removeBook).toHaveBeenCalledWith('r1')
  })
})

import { Test, TestingModule } from '@nestjs/testing'

import { AuthorResolver } from './author.resolver'
import { AuthorService } from './author.service'

describe('AuthorResolver', () => {
  let resolver: AuthorResolver

  let service: AuthorService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorResolver,
        {
          provide: AuthorService,
          useValue: {
            createAuthor: jest.fn(),
            findAllAuthors: jest.fn(),
            getAuthorById: jest.fn(),
            updateAuthor: jest.fn(),
            removeAuthor: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<AuthorResolver>(AuthorResolver)
    service = module.get<AuthorService>(AuthorService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAllAuthors should pass args to service', async () => {
    const response = { bookList: [], booksCount: 0 } as any
    ;(service.findAllAuthors as jest.Mock).mockResolvedValue(response)
    const result = await resolver.findAllAuthors({ limit: 10, skip: 5 } as any)
    expect(result).toEqual(response)
    expect(service.findAllAuthors).toHaveBeenCalledWith(10, 5)
  })

  it('getAuthorById should delegate', async () => {
    const author = { _id: 'a1', name: 'Auth' } as any
    ;(service.getAuthorById as jest.Mock).mockResolvedValue(author)
    const result = await resolver.getAuthorById('a1' as any)
    expect(result).toEqual(author)
    expect(service.getAuthorById).toHaveBeenCalledWith('a1')
  })

  it('createAuthor should delegate', async () => {
    const input = { name: 'New' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createAuthor as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createAuthor(input)
    expect(result).toEqual(created)
    expect(service.createAuthor).toHaveBeenCalledWith(input)
  })

  it('updateAuthor should delegate', async () => {
    const update = { _id: 'u1', name: 'Upd' } as any
    const updated = { _id: 'u1', name: 'Upd' } as any
    ;(service.updateAuthor as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateAuthor(update)
    expect(result).toEqual(updated)
    expect(service.updateAuthor).toHaveBeenCalledWith('u1', update)
  })

  it('removeAuthor should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeAuthor as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeAuthor('r1' as any)
    expect(result).toEqual(removed)
    expect(service.removeAuthor).toHaveBeenCalledWith('r1')
  })
})

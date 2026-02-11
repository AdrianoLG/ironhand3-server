import { Test, TestingModule } from '@nestjs/testing'

import { HeaderResolver } from './header.resolver'
import { HeaderService } from './header.service'

describe('HeaderResolver', () => {
  let resolver: HeaderResolver

  let service: HeaderService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeaderResolver,
        {
          provide: HeaderService,
          useValue: {
            createHeader: jest.fn(),
            findAllHeaders: jest.fn(),
            getHeaderById: jest.fn(),
            updateHeader: jest.fn(),
            removeHeader: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<HeaderResolver>(HeaderResolver)
    service = module.get<HeaderService>(HeaderService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAllHeaders should return from service', async () => {
    const headers = [{ _id: '1', title: 'A' }] as any
    ;(service.findAllHeaders as jest.Mock).mockResolvedValue(headers)
    const result = await resolver.findAllHeaders()
    expect(result).toEqual(headers)
    expect(service.findAllHeaders).toHaveBeenCalled()
  })

  it('getHeaderById should delegate', async () => {
    const header = { _id: 'h1', title: 'B' } as any
    ;(service.getHeaderById as jest.Mock).mockResolvedValue(header)
    const result = await resolver.getHeaderById('h1' as any)
    expect(result).toEqual(header)
    expect(service.getHeaderById).toHaveBeenCalledWith('h1')
  })

  it('createHeader should delegate', async () => {
    const input = { title: 'New' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createHeader as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createHeader(input)
    expect(result).toEqual(created)
    expect(service.createHeader).toHaveBeenCalledWith(input)
  })

  it('updateHeader should delegate', async () => {
    const update = { _id: 'u1', title: 'Upd' } as any
    const updated = { _id: 'u1', title: 'Upd' } as any
    ;(service.updateHeader as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateHeader(update)
    expect(result).toEqual(updated)
    expect(service.updateHeader).toHaveBeenCalledWith('u1', update)
  })

  it('removeHeader should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeHeader as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeHeader('r1' as any)
    expect(result).toEqual(removed)
    expect(service.removeHeader).toHaveBeenCalledWith('r1')
  })
})

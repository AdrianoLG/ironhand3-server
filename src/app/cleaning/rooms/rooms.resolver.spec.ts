import { Test, TestingModule } from '@nestjs/testing'

import { RoomsResolver } from './rooms.resolver'
import { RoomsService } from './rooms.service'

describe('RoomsResolver', () => {
  let resolver: RoomsResolver

  let service: RoomsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsResolver,
        {
          provide: RoomsService,
          useValue: {
            createRoom: jest.fn(),
            findAllRooms: jest.fn(),
            getRoomById: jest.fn(),
            updateRoom: jest.fn(),
            removeRoom: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<RoomsResolver>(RoomsResolver)
    service = module.get<RoomsService>(RoomsService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAll should return from service', async () => {
    const rooms = [{ _id: 'r1', name: 'Kitchen' }] as any
    ;(service.findAllRooms as jest.Mock).mockResolvedValue(rooms)
    const result = await resolver.findAll()
    expect(result).toEqual(rooms)
    expect(service.findAllRooms).toHaveBeenCalled()
  })

  it('findOne should delegate', async () => {
    const room = { _id: 'rx', name: 'Bedroom' } as any
    ;(service.getRoomById as jest.Mock).mockResolvedValue(room)
    const result = await resolver.findOne('rx' as any)
    expect(result).toEqual(room)
    expect(service.getRoomById).toHaveBeenCalledWith('rx')
  })

  it('createRoom should delegate', async () => {
    const input = { name: 'New' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createRoom as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createRoom(input)
    expect(result).toEqual(created)
    expect(service.createRoom).toHaveBeenCalledWith(input)
  })

  it('updateRoom should delegate', async () => {
    const update = { _id: 'u1', name: 'Upd' } as any
    const updated = { _id: 'u1', name: 'Upd' } as any
    ;(service.updateRoom as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateRoom(update)
    expect(result).toEqual(updated)
    expect(service.updateRoom).toHaveBeenCalledWith('u1', update)
  })

  it('removeRoom should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeRoom as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeRoom('del1' as any)
    expect(result).toEqual(removed)
    expect(service.removeRoom).toHaveBeenCalledWith('del1')
  })
})

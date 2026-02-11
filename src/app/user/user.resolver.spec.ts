import { Test, TestingModule } from '@nestjs/testing'

import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

describe('UserResolver', () => {
  let resolver: UserResolver

  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            findAllUsers: jest.fn(),
            getUserById: jest.fn(),
            updateUser: jest.fn(),
            removeUser: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAllUsers should return from service', async () => {
    const users = [{ _id: '1', name: 'A' }] as any
    ;(service.findAllUsers as jest.Mock).mockResolvedValue(users)
    const result = await resolver.findAllUsers()
    expect(result).toEqual(users)
    expect(service.findAllUsers).toHaveBeenCalled()
  })

  it('getUserById should delegate', async () => {
    const user = { _id: 'u1', name: 'B' } as any
    ;(service.getUserById as jest.Mock).mockResolvedValue(user)
    const result = await resolver.getUserById('u1' as any)
    expect(result).toEqual(user)
    expect(service.getUserById).toHaveBeenCalledWith('u1')
  })

  it('createUser should delegate', async () => {
    const input = { name: 'New' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createUser as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createUser(input)
    expect(result).toEqual(created)
    expect(service.createUser).toHaveBeenCalledWith(input)
  })

  it('updateUser should delegate', async () => {
    const update = { _id: 'u1', name: 'Upd' } as any
    const updated = { _id: 'u1', name: 'Upd' } as any
    ;(service.updateUser as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateUser(update)
    expect(result).toEqual(updated)
    expect(service.updateUser).toHaveBeenCalledWith('u1', update)
  })

  it('removeUser should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeUser as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeUser('r1' as any)
    expect(result).toEqual(removed)
    expect(service.removeUser).toHaveBeenCalledWith('r1')
  })
})

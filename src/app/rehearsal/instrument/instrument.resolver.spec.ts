import { Test, TestingModule } from '@nestjs/testing'

import { InstrumentResolver } from './instrument.resolver'
import { InstrumentService } from './instrument.service'

describe('InstrumentResolver', () => {
  let resolver: InstrumentResolver

  let service: InstrumentService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentResolver,
        {
          provide: InstrumentService,
          useValue: {
            createInstrument: jest.fn(),
            findAllInstruments: jest.fn(),
            getInstrumentById: jest.fn(),
            updateInstrument: jest.fn(),
            removeInstrument: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<InstrumentResolver>(InstrumentResolver)
    service = module.get<InstrumentService>(InstrumentService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAll should return from service', async () => {
    const instruments = [{ _id: 'i1', name: 'Piano' }] as any
    ;(service.findAllInstruments as jest.Mock).mockResolvedValue(instruments)
    const result = await resolver.findAll()
    expect(result).toEqual(instruments)
    expect(service.findAllInstruments).toHaveBeenCalled()
  })

  it('findOne should delegate', async () => {
    const instrument = { _id: 'ix', name: 'Guitar' } as any
    ;(service.getInstrumentById as jest.Mock).mockResolvedValue(instrument)
    const result = await resolver.findOne('ix' as any)
    expect(result).toEqual(instrument)
    expect(service.getInstrumentById).toHaveBeenCalledWith('ix')
  })

  it('createInstrument should delegate', async () => {
    const input = { name: 'New' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createInstrument as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createInstrument(input)
    expect(result).toEqual(created)
    expect(service.createInstrument).toHaveBeenCalledWith(input)
  })

  it('updateInstrument should delegate', async () => {
    const update = { _id: 'u1', name: 'Upd' } as any
    const updated = { _id: 'u1', name: 'Upd' } as any
    ;(service.updateInstrument as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateInstrument(update)
    expect(result).toEqual(updated)
    expect(service.updateInstrument).toHaveBeenCalledWith('u1', update)
  })

  it('removeInstrument should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeInstrument as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeInstrument('del1' as any)
    expect(result).toEqual(removed)
    expect(service.removeInstrument).toHaveBeenCalledWith('del1')
  })
})

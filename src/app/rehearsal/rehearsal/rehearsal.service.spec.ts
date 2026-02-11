import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { RehearsalService } from './rehearsal.service'

describe('RehearsalService', () => {
  let service: RehearsalService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RehearsalService,
        { provide: getModelToken('Rehearsal'), useValue: {} }
      ]
    }).compile()

    service = module.get<RehearsalService>(RehearsalService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

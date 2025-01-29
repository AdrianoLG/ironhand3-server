import { Test, TestingModule } from '@nestjs/testing'

import { CompletedExerciseService } from './completed-exercise.service'

describe('CompletedExerciseService', () => {
  let service: CompletedExerciseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletedExerciseService]
    }).compile()

    service = module.get<CompletedExerciseService>(CompletedExerciseService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

import { Test, TestingModule } from '@nestjs/testing'

import { CompletedExerciseResolver } from './completed-exercise.resolver'
import { CompletedExerciseService } from './completed-exercise.service'

describe('CompletedExerciseResolver', () => {
  let resolver: CompletedExerciseResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletedExerciseResolver, CompletedExerciseService]
    }).compile()

    resolver = module.get<CompletedExerciseResolver>(CompletedExerciseResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

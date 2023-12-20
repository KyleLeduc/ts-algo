import { describe, expect, it } from 'vitest'
import { doWork, data, pt1Stub, pt2Stub } from '.'

describe('AoC 2023 - Day 4', () => {
  it('pt 1 - stub', () => {
    const answer = doWork(pt1Stub)

    expect(answer).toBe(13)
  })

  it('pt 1 - answer', () => {
    const answer = doWork(data)

    expect(answer).toBe(23673)
  })
})

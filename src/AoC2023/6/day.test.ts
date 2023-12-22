import { describe, expect, it } from 'vitest'
import { doWork, data, pt1Stub, pt2Stub } from '.'

describe('AoC 2023 - Day 6', () => {
  it('pt 1 - stub', () => {
    const answer = doWork(pt1Stub)

    expect(answer).toBe(288)
  })

  it('pt 1 - stub', () => {
    const answer = doWork(data)

    expect(answer).toBe(1312850)
  })
})

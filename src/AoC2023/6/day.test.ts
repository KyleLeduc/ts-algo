import { describe, expect, it } from 'vitest'
import { doWork, doWork2, data, pt1Stub, pt2Stub } from '.'

describe('AoC 2023 - Day 6', () => {
  it('pt 1 - stub', () => {
    const answer = doWork(pt1Stub)

    expect(answer).toBe(288)
  })

  it('pt 1 - answer', () => {
    const answer = doWork(data)

    expect(answer).toBe(1312850)
  })

  it('pt 2 - stub', () => {
    const answer = doWork2(pt2Stub)

    expect(answer).toBe(71503)
  })

  it('pt 2 - answer', () => {
    const answer = doWork2(data)

    expect(answer).toBe(36749103)
  })
})

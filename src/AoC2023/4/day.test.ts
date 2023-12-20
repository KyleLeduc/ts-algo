import { describe, expect, it } from 'vitest'
import { doWork, data, pt1Stub, pt2Stub } from '.'
import { doWork2 } from './part2'

describe('AoC 2023 - Day 4', () => {
  it('pt 1 - stub', () => {
    const answer = doWork(pt1Stub)

    expect(answer).toBe(13)
  })

  it('pt 1 - answer', () => {
    const answer = doWork(data)

    expect(answer).toBe(23673)
  })

  it('pt 2 - stub', () => {
    const answer = doWork2(pt2Stub)

    expect(answer).toBe(30)
  })

  it('pt 2 - answer', () => {
    const answer = doWork2(data)

    expect(answer).toBe(12263631)
  })
})

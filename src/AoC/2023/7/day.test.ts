import { describe, expect, it } from 'vitest'
import { doWork, data, pt1Stub, pt2Stub, cardStringToNumber } from '.'
import { logFullObject } from '../../utils'

describe('AoC 2023 - Day 7', () => {
  it('pt 1 - stub', () => {
    const answer = doWork(pt1Stub)

    expect(answer).toBe(6440)
  })

  it('pt 1 - answer', () => {
    const answer = doWork(data)

    expect(answer).toBe(246795406)
  })

  it('card string to number', () => {
    expect(cardStringToNumber('a')).toBe(14)
    expect(cardStringToNumber('K')).toBe(13)
    expect(cardStringToNumber('q')).toBe(12)
    expect(cardStringToNumber('J')).toBe(11)
    expect(cardStringToNumber('t')).toBe(10)
    expect(cardStringToNumber('8')).toBe(8)
  })
})

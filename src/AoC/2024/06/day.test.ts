import { describe, expect, it } from 'vitest'
import { doWork, data, pt1Stub, pt2Stub } from '.'

describe('aoc 2024', () => {
  it('day 6 pt 1 - test case', () => {
    const answer = doWork(pt1Stub)

    expect(answer).toBe(41)
  })

  it('day 6 pt 1', () => {
    const answer = doWork(data)

    expect(answer).toBe(5531)
  })

  it('day 6 pt 2 - test case', () => {
    const answer = doWork(pt2Stub, false)

    expect(answer).toBe(6)
  })

  it('day 6 pt 2', () => {
    const answer = doWork(data, false)

    expect(answer).toBe(2165)
  })
})

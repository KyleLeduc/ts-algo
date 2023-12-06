import { describe, expect, it } from 'vitest'
import { doWork, pt1Stub, pt2Stub } from '.'

describe('aoc 2023', () => {
  it.skip('day 1 pt 1', () => {
    const answer = doWork(pt1Stub)
    console.log(answer)

    expect(answer).toBe(undefined)
  })
})

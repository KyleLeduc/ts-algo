import { describe, expect, it } from 'vitest'
import { doWork, data, pt1Stub, pt2Stub } from '.'

describe('aoc 2024', () => {
  it.skip('day 1 pt 1 - test case', () => {
    const answer = doWork(pt1Stub)
    console.log(answer)

    expect(answer).toBe(undefined)
  })

  it.skip('day 1 pt 1', () => {
    const answer = doWork(data)
    console.log(answer)

    expect(answer).toBe(undefined)
  })

  it.skip('day 1 pt 2 - test case', () => {
    const answer = doWork(pt2Stub, false)
    console.log(answer)

    expect(answer).toBe(undefined)
  })

  it.skip('day 1 pt 2', () => {
    const answer = doWork(data, false)
    console.log(answer)

    expect(answer).toBe(undefined)
  })
})

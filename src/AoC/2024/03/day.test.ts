import { describe, expect, it } from 'vitest'
import { doWork, data, pt1Stub, pt2Stub } from '.'

describe('aoc 2024', () => {
  it('day 1 pt 1 - test case', () => {
    const answer = doWork(pt1Stub)

    expect(answer).toBe(161)
  })

  it('day 1 pt 1', () => {
    const answer = doWork(data)

    expect(answer).toBe(192767529)
  })

  it('day 1 pt 2 - test case', () => {
    const answer = doWork(pt2Stub, false)

    expect(answer).toBe(48)
  })

  it('day 1 pt 2 - test case', () => {
    const answer = doWork("do()don't()mul(1,3)", false)

    expect(answer).toBe(0)
  })

  it('day 1 pt 2 - test case', () => {
    const answer = doWork("do()mul(1,3)do()don't()do()mul(1,3)", false)

    expect(answer).toBe(6)
  })

  it('day 1 pt 2', () => {
    const answer = doWork(data, false)

    expect(answer).toBe(104083373)
  })
})

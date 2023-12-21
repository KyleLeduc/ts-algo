import { describe, expect, it } from 'vitest'
import { doWork, data, RangeMap, pt1Stub, pt2Stub } from '.'

describe('aoc 2023', () => {
  it.skip('day 1 pt 1', () => {
    const answer = doWork(pt1Stub)
    console.log(answer)

    expect(answer).toBe(undefined)
  })

  it('RangeMap - convert source to destination', () => {
    const rangeMap = new RangeMap()

    const expectedValue = 13
    const actualValue = rangeMap.convertSourceToDestination(expectedValue)

    expect(expectedValue).toBe(actualValue)
  })

  it('RangeMap.isInRange - out of range', () => {
    const rangeMap = new RangeMap()

    const testValue = 13
    const actualValue = rangeMap.isInRange(testValue)

    expect(actualValue).toBeNull()
  })

  it('RangeMap.isInRange - out of range', () => {
    const rangeMap = new RangeMap()

    const testValue = 50
    const actualValue = rangeMap.isInRange(testValue)

    expect(actualValue).toMatchInlineSnapshot(`
      {
        "destination": 52,
        "range": 48,
        "source": 50,
      }
    `)
  })

  it('RangeMap.isInRange - out of range', () => {
    const rangeMap = new RangeMap()

    const testValue = 98
    const actualValue = rangeMap.isInRange(testValue)

    expect(actualValue).toMatchInlineSnapshot(`
      {
        "destination": 50,
        "range": 2,
        "source": 98,
      }
    `)
  })
})

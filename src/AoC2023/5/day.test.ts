import { describe, expect, it } from 'vitest'
import { doWork, data, RangeMap, pt1Stub, pt2Stub, RangeMapFactory } from '.'
import { logFullObject } from '../../utils'
const testRange = `50 98 2
52 50 48`

describe('AoC 2023 - Day 5', () => {
  it('pt 1 - stub', () => {
    const answer = doWork(pt1Stub)

    expect(answer).toBe(35)
  })

  it('pt 1 - answer', () => {
    const answer = doWork(data)

    expect(answer).toBe(111627841)
  })

  it('RangeMapFactory - findLowestLocation', () => {
    const mapFactory = new RangeMapFactory(pt1Stub)

    expect(mapFactory.findLowestLocation([79, 14, 55, 13])).toBe(35)
  })

  it('RangeMapFactory - init', () => {
    const mapFactory = new RangeMapFactory(pt1Stub)

    expect(mapFactory.rangeMaps).toMatchInlineSnapshot(`
      [
        RangeMap {
          "maps": [
            {
              "destination": 50,
              "range": 2,
              "source": 98,
            },
            {
              "destination": 52,
              "range": 48,
              "source": 50,
            },
          ],
        },
        RangeMap {
          "maps": [
            {
              "destination": 0,
              "range": 37,
              "source": 15,
            },
            {
              "destination": 37,
              "range": 2,
              "source": 52,
            },
            {
              "destination": 39,
              "range": 15,
              "source": 0,
            },
          ],
        },
        RangeMap {
          "maps": [
            {
              "destination": 49,
              "range": 8,
              "source": 53,
            },
            {
              "destination": 0,
              "range": 42,
              "source": 11,
            },
            {
              "destination": 42,
              "range": 7,
              "source": 0,
            },
            {
              "destination": 57,
              "range": 4,
              "source": 7,
            },
          ],
        },
        RangeMap {
          "maps": [
            {
              "destination": 88,
              "range": 7,
              "source": 18,
            },
            {
              "destination": 18,
              "range": 70,
              "source": 25,
            },
          ],
        },
        RangeMap {
          "maps": [
            {
              "destination": 45,
              "range": 23,
              "source": 77,
            },
            {
              "destination": 81,
              "range": 19,
              "source": 45,
            },
            {
              "destination": 68,
              "range": 13,
              "source": 64,
            },
          ],
        },
        RangeMap {
          "maps": [
            {
              "destination": 0,
              "range": 1,
              "source": 69,
            },
            {
              "destination": 1,
              "range": 69,
              "source": 0,
            },
          ],
        },
        RangeMap {
          "maps": [
            {
              "destination": 60,
              "range": 37,
              "source": 56,
            },
            {
              "destination": 56,
              "range": 4,
              "source": 93,
            },
          ],
        },
      ]
    `)
  })

  it('RangeMapFactory - init', () => {
    const mapFactory = new RangeMapFactory(pt1Stub)

    expect(mapFactory.mapSeed(79)).toBe(82)
    expect(mapFactory.mapSeed(14)).toBe(43)
    expect(mapFactory.mapSeed(55)).toBe(86)
    expect(mapFactory.mapSeed(13)).toBe(35)
  })

  it('RangeMap - init', () => {
    const rangeMap = new RangeMap('')

    const actualValue = rangeMap.init(testRange)

    expect(actualValue).toMatchInlineSnapshot(`
      [
        {
          "destination": 50,
          "range": 2,
          "source": 98,
        },
        {
          "destination": 52,
          "range": 48,
          "source": 50,
        },
      ]
    `)
  })

  it('RangeMap - constructor', () => {
    const rangeMap = new RangeMap(testRange)

    const actualValue = rangeMap.maps

    expect(actualValue).toMatchInlineSnapshot(`
      [
        {
          "destination": 50,
          "range": 2,
          "source": 98,
        },
        {
          "destination": 52,
          "range": 48,
          "source": 50,
        },
      ]
    `)
  })

  it('RangeMap - convert source to destination', () => {
    const rangeMap = new RangeMap(testRange)

    const expectedValue = 13
    const actualValue = rangeMap.convertSourceToDestination(expectedValue)

    expect(expectedValue).toBe(actualValue)
  })

  it('RangeMap.isInRange - out of range', () => {
    const rangeMap = new RangeMap(testRange)

    const testValue = 13
    const actualValue = rangeMap.isInRange(testValue)

    expect(actualValue).toBeNull()
  })

  it('RangeMap.isInRange - in second range', () => {
    const rangeMap = new RangeMap(testRange)

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

  it('RangeMap.isInRange - in first range', () => {
    const rangeMap = new RangeMap(testRange)

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

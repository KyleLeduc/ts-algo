import { describe, expect, it } from 'vitest'
import {
  doWork,
  data,
  pt1Stub,
  pt2Stub,
  indexSymbols,
  indexNumbers
} from '.'

const testString = '..&..132..*.1234'

describe('aoc 2023 - Day 3', () => {
  it('pt 1 - stub', () => {
    const answer = doWork(pt1Stub)

    expect(answer).toBe(4361)
  })

  it('pt 1 - answer', () => {
    const answer = doWork(data)

    expect(answer).toBe(527364)
  })

  it('should return indices of symbols', () => {
    const answer = indexSymbols(testString)

    expect(answer).toMatchInlineSnapshot(`
      [
        2,
        10,
      ]
    `)
  })

  it('should return indices of numbers', () => {
    const answer = indexNumbers(testString)

    expect(answer).toMatchInlineSnapshot(`
      [
        {
          "match": "132",
          "startIdx": 5,
        },
        {
          "match": "1234",
          "startIdx": 12,
        },
      ]
    `)
  })

  it('should handle no match string', () => {
    const answer = indexNumbers('..........')

    expect(answer).toMatchInlineSnapshot('[]')
  })
})

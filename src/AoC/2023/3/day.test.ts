import { describe, expect, it } from 'vitest'
import { doWork, data, pt1Stub, pt2Stub, indexSymbols, indexNumbers } from '.'
import { doWork2 } from './part2'

const testString = '..&..132..*.1234'

const testData = `
......*1..
......2...`

describe('aoc 2023 - Day 3', () => {
  it('pt 1 - stub', () => {
    const answer = doWork(pt1Stub)

    expect(answer).toBe(4361)
  })

  it('pt 1 - answer', () => {
    const answer = doWork(data)

    expect(answer).toBe(527364)
  })

  it('pt 2 - stub', () => {
    const answer = doWork2(pt2Stub)

    expect(answer).toBe(467835)
  })

  it('pt 2 - answer', () => {
    const answer = doWork2(data)

    expect(answer).toBe(79026871)
  })

  it('pt 2 - single number directly under gear', () => {
    const answer = doWork2(testData)

    expect(answer).toBe(2)
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

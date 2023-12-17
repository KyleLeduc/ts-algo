import { describe, expect, it } from 'vitest'
import { doWork, pt1Stub, pt2Stub, indexSymbols, indexNumbers } from '.'
import util from 'util'

const testString = '..&..132..*.123'

describe('aoc 2023 - Day 3', () => {
  it('pt 1 - stub', () => {
    const answer = doWork(pt1Stub)

    answer.forEach((line, i) => {
      console.log(`Line: ${i}`)
      console.log(
        util.inspect(line, { showHidden: false, depth: null, colors: true })
      )
    })

    expect(true).toBe(true)
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
          "matchLength": 3,
          "startIdx": 5,
        },
        {
          "matchLength": 3,
          "startIdx": 12,
        },
      ]
    `)
  })
})

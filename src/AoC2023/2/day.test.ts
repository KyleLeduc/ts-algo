import { describe, expect, it } from 'vitest'
import { doWork, processData, data, pt1Stub, pt2Stub } from '.'
import { testCase } from './stubs'

describe('aoc 2023 - day 2', () => {
  it('pt 1 - Processing Data', () => {
    const result = processData(pt1Stub)

    expect(result).toMatchInlineSnapshot(`
      {
        "1": {
          "blue": 6,
          "green": 2,
          "red": 4,
        },
        "2": {
          "blue": 4,
          "green": 3,
          "red": 1,
        },
        "3": {
          "blue": 6,
          "green": 13,
          "red": 20,
        },
        "4": {
          "blue": 15,
          "green": 3,
          "red": 14,
        },
        "5": {
          "blue": 2,
          "green": 3,
          "red": 6,
        },
      }
    `)
  })

  it('pt 1 - Stub Answer', () => {
    const answer = doWork(pt1Stub, testCase)

    expect(answer).toBe(8)
  })

  it('pt 1 - Answer', () => {
    const answer = doWork(data, testCase)

    console.log(answer)
  })
})

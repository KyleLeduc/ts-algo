import { describe, it, expect } from 'vitest'
import { permuteUnique } from './index'
import { testCases } from './stubs'

const containsArray = <T>(outerArray: T[][], targetArray: T[]) => {
  return outerArray.some(
    (subArray) =>
      subArray.length === targetArray.length &&
      subArray.every((value, index) => value === targetArray[index])
  )
}

describe('Unique permutations', () => {
  for (const [index, { input, output: expectedValue, name }] of Object.entries(
    testCases
  )) {
    it(`${name}${+index + 1} [${input}]`, () => {
      const actualValue = permuteUnique(input)

      expect(expectedValue).toHaveLength(actualValue.length)

      for (const array of expectedValue) {
        expect(containsArray(actualValue, array)).toBe(true)
      }
    })
  }
})

import { describe, it, expect } from 'vitest'
import { longestSubString } from './index'

describe('longest sub string', () => {
  it('should return an empty string if no letters match', () => {
    const firstString = 'abc'
    const secondString = 'xyz'

    const result = longestSubString(firstString, secondString)

    expect(result).toBe('')
  })

  it('should return all letters if identical', () => {
    const firstString = 'abcdef'
    const secondString = 'abcdef'

    const result = longestSubString(firstString, secondString)

    expect(result).toBe('abcdef')
  })

  it.only('trailing letters should match starting letters', () => {
    const firstString = 'aabcxy'
    const secondString = 'xyz'

    const result = longestSubString(firstString, secondString)

    expect(result).toBe('xy')
  })

  it('empty strings return empty string', () => {
    const firstString = ''
    const secondString = ''

    const result = longestSubString(firstString, secondString)

    expect(result).toBe('')
  })

})

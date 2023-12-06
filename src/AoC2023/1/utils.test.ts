import { describe, expect, it } from 'vitest'
import { convertMatch } from '.'

describe('aoc 2023', () => {
  it('should return numbers between 1-9', () => {
    expect(convertMatch('95')).toBe(9)
    expect(convertMatch('nine')).toBe(9)
  })
})

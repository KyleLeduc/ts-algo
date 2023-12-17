import { describe, expect, it } from 'vitest'
import {
  day1Data,
  pt1StubArr,
  pt2StubArr,
  findCalibrationValuesPt1,
  findCalibrationValuesPt2
} from '.'

describe('aoc 2023 - day 1', () => {
  it('pt 1 - stub', () => {
    const answer = findCalibrationValuesPt1(pt1StubArr)

    expect(answer).toBe(142)
  })

  it('pt 1 - solve', () => {
    const answer = findCalibrationValuesPt1(day1Data)

    expect(answer).toBe(55172)
  })
  it('pt 2 - stub', () => {
    const answer = findCalibrationValuesPt2(pt2StubArr)

    expect(answer).toBe(281)
  })

  it('pt 2 - solve', () => {
    const answer = findCalibrationValuesPt2(day1Data)

    expect(answer).toBe(undefined)
  })

  it('pt 2 - joined words', () => {
    const answer = findCalibrationValuesPt2(['xtwone3four'])

    expect(answer).toBe(24)
  })

  it('pt 2 - joined words 2', () => {
    const answer = findCalibrationValuesPt2(['3xtwone'])

    expect(answer).toBe(31)
  })

  it('pt 2 - joined words 2', () => {
    const answer = findCalibrationValuesPt2(['zoneight234'])

    expect(answer).toBe(14)
  })

  it('pt 2 - single number', () => {
    const answer = findCalibrationValuesPt2(['two'])

    expect(answer).toBe(22)
  })
  it('pt 2 - joined numbers', () => {
    const answer = findCalibrationValuesPt2(['26', '1'])

    expect(answer).toBe(37)
  })
})

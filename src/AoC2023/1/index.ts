import { data, pt1Stub, pt2Stub } from './stub'

export const day1Data = data.split('\n')
export const pt1StubArr = pt1Stub.split('\n')
export const pt2StubArr = pt2Stub.split('\n')

export const findCalibrationValuesPt1 = (data: string[]) => {
  const result: number[] = []
  const firstNumberRE = /(\d).*$/
  const lastNumberRE = /^.*(\d)/

  data.forEach((value) => {
    const first = value.match(firstNumberRE)
    const last = value.match(lastNumberRE)
    if (!first || !last) return
    result.push(parseFloat(first[1] + last[1]))
  })

  return result.reduce((prev, curr) => prev + curr, 0)
}

const wordNumberMap = [
  undefined,
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
]

const wordNumRE = new RegExp(
  `one|two|three|four|five|six|seven|eight|nine|(\\d)`,
  'gi'
)

export const findCalibrationValuesPt2 = (data: string[]) => {
  const result: number[] = []

  data.forEach((value) => {
    let match, lastMatch
    const firstMatch = wordNumRE.exec(value)

    while ((match = wordNumRE.exec(value)) !== null) {
      lastMatch = match
    }
    if (!firstMatch) return
    if (!lastMatch) lastMatch = firstMatch


    if (last > 9) last = last % 10

    result.push(parseFloat('' + first + last))
  })

  return result.reduce((prev, curr) => prev + curr, 0)
}

export const convertMatch = (match: string) => {
  const result = parseInt(match, 10)

  return !isNaN(result) ? result : wordNumberMap.indexOf(match)
}

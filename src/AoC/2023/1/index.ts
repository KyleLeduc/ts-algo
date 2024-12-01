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

const wordNumRE = /one|two|three|four|five|six|seven|eight|nine|\d/gi

export const findCalibrationValuesPt2 = (data: string[]) => {
  const result: number[] = []

  data.forEach((value) => {
    const matches = []
    let match

    // Loop through the string, checking for matches at each position
    for (let i = 0; i < value.length; i++) {
      // Reset the lastIndex to search from the current position
      wordNumRE.lastIndex = i

      // Attempt to find a match
      match = wordNumRE.exec(value)

      // If a match is found and it starts at the current position
      if (match && match.index === i) {
        matches.push(match[0])
      }
    }

    const first = convertMatch(matches[0])
    let last = convertMatch(matches[matches.length - 1])

    if (last > 9) last = last % 10

    result.push(parseFloat('' + first + last))
  })

  return result.reduce((prev, curr) => prev + curr, 0)
}

export const convertMatch = (match: string) => {
  const result = parseInt(match, 10)

  return !isNaN(result) ? result : wordNumberMap.indexOf(match)
}

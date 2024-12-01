export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, pt1 = true) => {
  const processedData = processData(data)

  if (pt1) {
    return partOne(processedData)
  } else {
    return partTwo(processedData)
  }
}

/**
 * Convert the string data into 2 sorted arrays of numbers
 *
 * @param data the string data to process
 * @returns 2 sorted arrays of numbers separated into columns
 */
const processData = (data: string) => {
  const re = new RegExp(/(\d+)\s+(\d+)/g)
  const firstNumbers: number[] = []
  const secondNumbers: number[] = []
  let match

  // console.log('match', re.exec('100  200'))

  while ((match = re.exec(data)) !== null) {
    firstNumbers.push(Number(match[1]))
    secondNumbers.push(Number(match[2]))
  }

  firstNumbers.sort((a, b) => a - b)
  secondNumbers.sort((a, b) => a - b)

  return { firstNumbers, secondNumbers }
}

const partOne = ({
  firstNumbers,
  secondNumbers
}: ReturnType<typeof processData>) => {
  let separation = 0

  for (const [index, firstLocationId] of firstNumbers.entries()) {
    const secondLocationId = secondNumbers[index]

    separation += Math.abs(firstLocationId - secondLocationId)
  }

  return separation
}

const partTwo = ({
  firstNumbers,
  secondNumbers
}: ReturnType<typeof processData>) => {
  let similarityScore = 0

  // for each number in first arr, find count of matches in second arr
  for (const number of firstNumbers) {
    const count = secondNumbers.filter((n) => n === number).length

    similarityScore += count * number
  }

  return similarityScore
}

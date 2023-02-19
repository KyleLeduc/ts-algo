// https://www.codewars.com/kata/52b7ed099cdc285c300001cd/typescript

export const testData: Interval[] = [
  [6, 10],
  [1, 2],
  [11, 15],
  [11, 13],
  [2, 5]
]

type Interval = [number, number]

export function sumOfIntervals(intervals: Interval[]) {
  const firstDigitAscending = intervals.sort((a, b) => a[0] - b[0])

  const joinedRanges = joinOverlaps(firstDigitAscending)

  const totalRange = joinedRanges && sumRanges(joinedRanges)

  return totalRange
}

function joinOverlaps(array: Interval[], start = 0): Interval[] {
  const pointer = start + 1
  let primeRange = array[start]
  const noOverlap: Interval[] = []
  const remainder = array.slice(pointer)
  const completed = array.slice(0, start < 0 ? 0 : start)

  // Check the rest of the array for overlaps
  for (const testRange of remainder) {
    if (testRange[0] > primeRange[1]) {
      noOverlap.push(testRange)
      continue
    }

    if (isConsumed(primeRange, testRange)) {
      continue
    }

    if (isPartialOverlap(primeRange, testRange)) {
      // If overlap is found, update the end of primeRange
      primeRange = [primeRange[0], testRange[1]]
    }
  }

  const filteredArr = [...completed, primeRange, ...noOverlap]

  if (filteredArr.length > pointer) {
    return joinOverlaps(filteredArr, pointer)
  }

  return filteredArr
}

function isConsumed(curr: Interval, next: Interval) {
  return curr[0] <= next[0] && curr[1] >= next[1]
}

function isPartialOverlap(first: Interval, second: Interval) {
  return second[0] <= first[1] && second[1] > first[1]
}

function sumRanges(array: Interval[]) {
  return array.reduce((prev, curr) => prev + (curr[1] - curr[0]), 0)
}

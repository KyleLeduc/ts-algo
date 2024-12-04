export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  const processedInput = processInput(data)

  if (dayOne) {
    return partOne(processedInput)
  } else {
    return partTwo(processedInput)
  }
}

const partOne = (data: number[][]) => {
  const reportEvaluation = data.map((row) => {
    let prevReading = row[0]
    let currentReading = row[1]
    const increasing = isIncreasing(prevReading, currentReading)

    for (let i = 1; i < row.length; i++) {
      prevReading = row[i - 1]
      currentReading = row[i]

      if (
        !isValidDiffRange(prevReading, currentReading) ||
        isIncreasing(prevReading, currentReading) !== increasing
      ) {
        return false
      }
    }

    return true
  })

  const passingReportsCount = reportEvaluation.reduce(
    (passingReports, reportPasses) => {
      if (reportPasses) {
        return passingReports + 1
      }
      return passingReports
    },
    0
  )

  return passingReportsCount
}

const partTwo = (data: number[][]) => {
  const reportEvaluation = data.map(isSafeWithDampener)

  const passingReportsCount = reportEvaluation.reduce(
    (passingReports, reportPasses) => {
      if (reportPasses) {
        return passingReports + 1
      }
      return passingReports
    },
    0
  )

  return passingReportsCount
}

const isSafeWithDampener = (row: number[]) => {
  for (let i = 0; i < row.length; i++) {
    const splicedRow = row.toSpliced(i, 1)

    if (isSafe(splicedRow)) return true
  }

  return false
}

const isSafe = (row: number[]) => {
  let prevReading = row[0]
  let currentReading = row[1]
  const increasing = isIncreasing(prevReading, currentReading)

  for (let i = 1; i < row.length; i++) {
    prevReading = row[i - 1]
    currentReading = row[i]

    if (
      !isValidDiffRange(prevReading, currentReading) ||
      isIncreasing(prevReading, currentReading) !== increasing
    ) {
      return false
    }
  }

  return true
}

const isIncreasing = (prev: number, current: number) => prev < current

const isValidDiffRange = (prev: number, current: number) => {
  const diff = Math.abs(prev - current)

  return diff > 0 && diff <= 3
}

const processInput = (input: string) => {
  const split = input.split('\n')

  return split.map((row) => row.split(' ').map((num) => parseInt(num)))
}

export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  if (dayOne) {
    return partOne(data)
  } else {
    return partTwo(data)
  }
}

const partOne = (data: string) => {
  return bridgeRepair(data.split('\n'))
}

const partTwo = (data: string) => {
  return bridgeRepair2(data.split('\n'))
}

function bridgeRepair(input: string[]): number {
  // Helper function to evaluate all possible combinations of operators
  function evaluateCombinations(numbers: number[], target: number): boolean {
    const operators = ['+', '*']

    // Recursive function to explore combinations
    function dfs(index: number, current: number): boolean {
      if (index === numbers.length) {
        return current === target
      }

      for (const op of operators) {
        const nextValue =
          op === '+' ? current + numbers[index] : current * numbers[index]
        if (dfs(index + 1, nextValue)) {
          return true
        }
      }

      return false
    }

    // Start exploring from the second number
    return dfs(1, numbers[0])
  }

  let totalCalibrationResult = 0

  for (const line of input) {
    // Parse each line into the target value and the array of numbers
    const [targetStr, numbersStr] = line.split(':')
    const target = parseInt(targetStr.trim(), 10)
    const numbers = numbersStr.trim().split(' ').map(Number)

    // Check if the equation can be solved
    if (evaluateCombinations(numbers, target)) {
      totalCalibrationResult += target
    }
  }

  return totalCalibrationResult
}

function bridgeRepair2(input: string[]): number {
  // Helper function to evaluate all possible combinations of operators
  function evaluateCombinations(numbers: number[], target: number): boolean {
    const operators = ['+', '*', '||']

    // Recursive function to explore combinations
    function dfs(index: number, current: number): boolean {
      if (index === numbers.length) {
        return current === target
      }

      for (const op of operators) {
        let nextValue
        if (op === '+') {
          nextValue = current + numbers[index]
        } else if (op === '*') {
          nextValue = current * numbers[index]
        } else if (op === '||') {
          nextValue = parseInt(`${current}${numbers[index]}`, 10)
        }

        if (dfs(index + 1, nextValue)) {
          return true
        }
      }

      return false
    }

    // Start exploring from the second number
    return dfs(1, numbers[0])
  }

  let totalCalibrationResult = 0

  for (const line of input) {
    // Parse each line into the target value and the array of numbers
    const [targetStr, numbersStr] = line.split(':')
    const target = parseInt(targetStr.trim(), 10)
    const numbers = numbersStr.trim().split(' ').map(Number)

    // Check if the equation can be solved
    if (evaluateCombinations(numbers, target)) {
      totalCalibrationResult += target
    }
  }

  return totalCalibrationResult
}

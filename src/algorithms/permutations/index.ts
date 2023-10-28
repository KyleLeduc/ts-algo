import { testCases } from './stubs'

export { testCases as uniquePermuteData }
export function permuteUnique(nums: number[]): number[][] {
  const result: number[][] = []
  const counts: { [key: number]: number } = {}

  // Count the occurrences of each number
  for (const num of nums) {
    if (counts[num] == null) counts[num] = 1
    else counts[num]++
  }

  const backtrack = (path: number[]) => {
    if (path.length === nums.length) {
      result.push([...path]) // if a permutation is found, add it to the result
      return
    }

    for (const num in counts) {
      if (counts[num] > 0) {
        // if the number is still available
        counts[num]-- // decrement the count
        path.push(Number(num)) // add the number to the path
        backtrack(path) // continue backtracking
        path.pop() // backtrack, remove the last number from the path
        counts[num]++ // restore the count
      }
    }
  }

  backtrack([])
  return result
}

export function shuffleArr(nums: number[], n: number): number[] {
  const shuffledArr: number[] = []

  for (let i = 0; i < n; i++) {
    shuffledArr.push(nums[i])
    shuffledArr.push(nums[i + n])
  }

  return shuffledArr
}

export const data = [
  { arr: [2, 5, 1, 3, 4, 7], num: 3 },
  { arr: [1, 2, 3, 4, 4, 3, 2, 1], num: 4 },
  { arr: [1, 1, 2, 2], num: 2 }
]

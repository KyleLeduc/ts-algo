interface Highest {
  number: number | undefined
  count: number
}

export function majorityElementON(nums: number[]): number {
  const majorityMap: { [key: number]: number } = {}
  let highest: Highest = { number: undefined, count: 0 }

  for (const num of nums) {
    if (majorityMap[num]) {
      majorityMap[num]++
      if (majorityMap[num] > highest.count)
        highest = { number: num, count: majorityMap[num] }
    } else {
      majorityMap[num] = 1
      if (highest.count === 0) highest = { number: num, count: 1 }
    }
  }

  return highest.number ?? -1
}

export function majorityElementONv2(nums: number[]): number {
  const majorityMap: { [key: number]: number } = {}
  const highest = { number: nums[0], count: 0 }

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i]

    if (!majorityMap[num]) {
      majorityMap[num] = 1
    } else {
      majorityMap[num]++

      if (majorityMap[num] > highest.count) {
        highest.number = num
        highest.count = majorityMap[num]
      }
    }
  }

  return highest.number
}

export function majorityElementO2N(nums: number[]): number {
  const majorityMap: { [key: number]: number } = {}

  for (const num of nums) {
    if (majorityMap[num]) {
      majorityMap[num]++
    } else {
      majorityMap[num] = 1
    }
  }

  const highest = Object.entries(majorityMap).reduce((accu, curr) => {
    if (curr[1] > accu[1]) {
      return curr
    }
    return accu
  })[0]

  return parseFloat(highest)
}

export function mooresLeaderElection(nums: number[]): number {
  const leader = { number: nums[0], count: 1 }

  for (let i = 1; i < nums.length; i++) {
    const currNumber = nums[i]

    if (currNumber === leader.number) {
      leader.count++
    } else {
      leader.count--
    }

    if (leader.count < 0) {
      leader.number = currNumber
      leader.count = 1
    }
  }
  console.log(leader.count)
  return leader.number
}

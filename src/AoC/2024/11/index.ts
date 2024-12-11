export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  if (dayOne) {
    return partOne(data)
  } else {
    return partTwo(data)
  }
}

const partOne = (data: string) => {
  // Parse the input string into an array of BigInt numbers
  let stones = data.trim().split(/\s+/).map(BigInt)

  const maxBlinks = 25

  for (let blink = 0; blink < maxBlinks; blink++) {
    const newStones: bigint[] = []

    // Process each stone and apply the transformation rules
    for (const stone of stones) {
      if (stone === BigInt(0)) {
        // Rule 1: If the stone is engraved with 0, replace it with a stone engraved with 1
        newStones.push(BigInt(1))
      } else if (stone.toString().length % 2 === 0) {
        // Rule 2: If the stone has an even number of digits, split it into two stones
        const digits = stone.toString()
        const mid = digits.length / 2

        // Split the digits into left and right halves
        const leftDigits = digits.slice(0, mid).replace(/^0+/, '') || '0'
        const rightDigits = digits.slice(mid).replace(/^0+/, '') || '0'

        // Convert the split digits back to BigInt and add to the new stones array
        newStones.push(BigInt(leftDigits), BigInt(rightDigits))
      } else {
        // Rule 3: Multiply the stone's number by 2024 and replace it
        newStones.push(stone * BigInt(2024))
      }
    }

    // Update the stones array for the next blink
    stones = newStones
  }

  // Return the total number of stones after all blinks
  return stones.length
}

const partTwo = (data: string) => {
  /**
   * Map to track counts of stones by their exact numbers.
   * Using strings to represent numbers to handle very large values.
   */
  let stoneCounts = new Map<string, bigint>()

  // Initialize the stone counts based on the input
  data
    .trim()
    .split(/\s+/)
    .forEach((numStr) => {
      const count = stoneCounts.get(numStr) || BigInt(0)
      stoneCounts.set(numStr, count + BigInt(1))
    })

  const maxBlinks = 75

  for (let blink = 0; blink < maxBlinks; blink++) {
    const newStoneCounts = new Map<string, bigint>()

    for (const [stoneStr, count] of stoneCounts) {
      if (stoneStr === '0') {
        // Rule 1: Replace stone engraved with 0 with a stone engraved with 1
        const existingCount = newStoneCounts.get('1') || BigInt(0)
        newStoneCounts.set('1', existingCount + count)
      } else if (stoneStr.length % 2 === 0) {
        // Rule 2: Split stone into two stones based on its digits
        const digits = stoneStr
        const mid = digits.length / 2

        // Split the digits into left and right halves
        const leftDigits = digits.slice(0, mid).replace(/^0+/, '') || '0'
        const rightDigits = digits.slice(mid).replace(/^0+/, '') || '0'

        // Update counts for left half
        const leftCount = newStoneCounts.get(leftDigits) || BigInt(0)
        newStoneCounts.set(leftDigits, leftCount + count)

        // Update counts for right half
        const rightCount = newStoneCounts.get(rightDigits) || BigInt(0)
        newStoneCounts.set(rightDigits, rightCount + count)
      } else {
        // Rule 3: Multiply the stone's number by 2024
        const multiplied = (BigInt(stoneStr) * BigInt(2024)).toString()

        // Update counts for the new stone
        const existingCount = newStoneCounts.get(multiplied) || BigInt(0)
        newStoneCounts.set(multiplied, existingCount + count)
      }
    }

    // Update the stone counts for the next blink
    stoneCounts = newStoneCounts
  }

  // Sum up all the counts to get the total number of stones after all blinks
  let totalStones = BigInt(0)
  for (const count of stoneCounts.values()) {
    totalStones += count
  }

  return Number(totalStones)
}

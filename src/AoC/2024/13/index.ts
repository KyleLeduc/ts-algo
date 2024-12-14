export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  if (dayOne) {
    return partOne(data)
  } else {
    return partTwo(data)
  }
}

const partOne = (data: string): number => {
  const lines = data.split('\n').filter(Boolean)

  type Machine = {
    a: { x: number; y: number; cost: number }
    b: { x: number; y: number; cost: number }
    prize: { x: number; y: number }
  }

  const machines: Machine[] = []

  // Parse input
  for (let i = 0; i < lines.length; i += 3) {
    const aMatch = lines[i].match(/Button A: X\+(\d+), Y\+(\d+)/)
    const bMatch = lines[i + 1].match(/Button B: X\+(\d+), Y\+(\d+)/)
    const prizeMatch = lines[i + 2].match(/Prize: X=(\d+), Y=(\d+)/)

    if (aMatch && bMatch && prizeMatch) {
      machines.push({
        a: { x: +aMatch[1], y: +aMatch[2], cost: 3 },
        b: { x: +bMatch[1], y: +bMatch[2], cost: 1 },
        prize: { x: +prizeMatch[1], y: +prizeMatch[2] }
      })
    }
  }

  let totalTokens = 0

  for (const machine of machines) {
    const { a, b, prize } = machine

    // Use dynamic programming to solve Diophantine equations for the machine.
    let minCost = Infinity

    for (let i = 0; i <= 100; i++) {
      for (let j = 0; j <= 100; j++) {
        const x = i * a.x + j * b.x
        const y = i * a.y + j * b.y

        if (x === prize.x && y === prize.y) {
          const cost = i * a.cost + j * b.cost
          minCost = Math.min(minCost, cost)
        }
      }
    }

    if (minCost !== Infinity) {
      totalTokens += minCost
    }
  }

  return totalTokens
}

const partTwo = (data: string): number => {
  const lines = data.split('\n').filter(Boolean)

  type Machine = {
    a: { x: number; y: number; cost: number }
    b: { x: number; y: number; cost: number }
    prize: { x: number; y: number }
  }

  const machines: Machine[] = []

  // Parse input
  for (let i = 0; i < lines.length; i += 3) {
    const aMatch = lines[i].match(/Button A: X\+(\d+), Y\+(\d+)/)
    const bMatch = lines[i + 1].match(/Button B: X\+(\d+), Y\+(\d+)/)
    const prizeMatch = lines[i + 2].match(/Prize: X=(\d+), Y=(\d+)/)

    if (aMatch && bMatch && prizeMatch) {
      machines.push({
        a: { x: +aMatch[1], y: +aMatch[2], cost: 3 },
        b: { x: +bMatch[1], y: +bMatch[2], cost: 1 },
        prize: {
          x: +prizeMatch[1] + 10000000000000,
          y: +prizeMatch[2] + 10000000000000
        }
      })
    }
  }

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

  const extendedGcd = (
    a: number,
    b: number
  ): { gcd: number; x: number; y: number } => {
    if (b === 0) return { gcd: a, x: 1, y: 0 }
    const { gcd, x, y } = extendedGcd(b, a % b)
    return { gcd, x: y, y: x - Math.floor(a / b) * y }
  }

  const solveDiophantine = (
    a1: number,
    b1: number,
    c1: number,
    a2: number,
    b2: number,
    c2: number
  ): number => {
    const det = a1 * b2 - a2 * b1
    if (det === 0) return Infinity

    const { gcd: gcdX, x: x1, y: y1 } = extendedGcd(a1, a2)

    if (c1 % gcdX !== 0 || c2 % gcdX !== 0) return Infinity

    const scale = c1 / gcdX
    const x0 = x1 * scale
    const y0 = y1 * scale

    const stepX = b2 / gcdX
    const stepY = -a2 / gcdX

    let minCost = Infinity

    for (let k = -100000; k <= 100000; k++) {
      const i = x0 + k * stepX
      const j = y0 + k * stepY

      if (i >= 0 && j >= 0 && Number.isInteger(i) && Number.isInteger(j)) {
        const cost = i * 3 + j
        minCost = Math.min(minCost, cost)
      }
    }

    return minCost
  }

  let totalTokens = 0

  for (const machine of machines) {
    const { a, b, prize } = machine

    const cost = solveDiophantine(a.x, b.x, prize.x, a.y, b.y, prize.y)
    if (cost !== Infinity) {
      totalTokens += cost
    }
  }

  return totalTokens
}

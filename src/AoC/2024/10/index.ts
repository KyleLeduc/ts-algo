export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  if (dayOne) {
    return partOne(data)
  } else {
    return partTwo(data)
  }
}

const partOne = (data: string) => {
  const map = data.split('\n').map((row) => row.split('').map(Number))
  const rows = map.length
  const cols = map[0].length

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ]

  const isValid = (x: number, y: number, prevHeight: number) => {
    return (
      x >= 0 && x < rows && y >= 0 && y < cols && map[x][y] === prevHeight + 1
    )
  }

  // Set to store reachable 9s for each trailhead
  const dfs = (
    x: number,
    y: number,
    visited: Set<string>,
    nines: Set<string>
  ) => {
    const currentHeight = map[x][y]

    // If we found a 9, add it to our set of found 9s
    if (currentHeight === 9) {
      nines.add(`${x},${y}`)
      return
    }

    visited.add(`${x},${y}`)

    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy
      if (isValid(nx, ny, currentHeight) && !visited.has(`${nx},${ny}`)) {
        dfs(nx, ny, new Set([...visited]), nines)
      }
    }
  }

  let totalScore = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (map[i][j] === 0) {
        const reachableNines = new Set<string>()
        dfs(i, j, new Set<string>(), reachableNines)
        totalScore += reachableNines.size
      }
    }
  }

  return totalScore
}

const partTwo = (data: string) => {
  const map = data.split('\n').map((row) => row.split('').map(Number))
  const rows = map.length
  const cols = map[0].length

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ]

  const isValid = (x: number, y: number, prevHeight: number) => {
    return (
      x >= 0 && x < rows && y >= 0 && y < cols && map[x][y] === prevHeight + 1
    )
  }

  // Use path string for memoization
  const cache = new Map<string, number>()

  const countTrails = (x: number, y: number, visited: Set<string>): number => {
    const key = `${x},${y},${[...visited].sort().join(':')}`
    if (cache.has(key)) return cache.get(key)!

    if (map[x][y] === 9) return 1

    let trails = 0
    visited.add(`${x},${y}`)

    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy
      if (isValid(nx, ny, map[x][y]) && !visited.has(`${nx},${ny}`)) {
        trails += countTrails(nx, ny, new Set([...visited]))
      }
    }

    cache.set(key, trails)
    return trails
  }

  let totalRating = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (map[i][j] === 0) {
        cache.clear() // Clear cache for each trailhead
        const rating = countTrails(i, j, new Set<string>())
        totalRating += rating
      }
    }
  }

  return totalRating
}

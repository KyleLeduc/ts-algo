type Position = {
  x: number
  y: number
}

type Direction = 'up' | 'right' | 'down' | 'left'

const DIRECTIONS: Direction[] = ['up', 'right', 'down', 'left']

function parseInput(input: string): {
  grid: string[][]
  startPos: Position
  startDir: Direction
} {
  const lines = input.trim().split('\n')
  const grid = lines.map((line) => line.split(''))
  let startPos: Position = { x: 0, y: 0 }
  let startDir: Direction = 'up'

  // Find starting position and direction
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '^') {
        startPos = { x, y }
        startDir = 'up'
        grid[y][x] = '.' // Clear the start position
      }
    }
  }

  return { grid, startPos, startDir }
}

function move(pos: Position, dir: Direction): Position {
  switch (dir) {
    case 'up':
      return { x: pos.x, y: pos.y - 1 }
    case 'right':
      return { x: pos.x + 1, y: pos.y }
    case 'down':
      return { x: pos.x, y: pos.y + 1 }
    case 'left':
      return { x: pos.x - 1, y: pos.y }
  }
}

function turnRight(dir: Direction): Direction {
  const currentIndex = DIRECTIONS.indexOf(dir)
  return DIRECTIONS[(currentIndex + 1) % 4]
}

function isInBounds(pos: Position, grid: string[][]): boolean {
  return (
    pos.y >= 0 && pos.y < grid.length && pos.x >= 0 && pos.x < grid[0].length
  )
}

function simulateGuardPath(
  grid: string[][],
  startPos: Position,
  startDir: Direction,
  obstaclePos?: Position
): Set<string> {
  const visited = new Set<string>()
  let pos = { ...startPos }
  let dir = startDir
  const maxSteps = grid.length * grid[0].length * 4 // Maximum possible steps before assuming infinite loop
  let steps = 0

  while (steps < maxSteps) {
    // Add current position to visited set
    visited.add(`${pos.x},${pos.y}`)

    // Check next position
    const nextPos = move(pos, dir)

    // Check if next position is blocked
    const isBlocked =
      !isInBounds(nextPos, grid) ||
      grid[nextPos.y][nextPos.x] === '#' ||
      (obstaclePos &&
        nextPos.x === obstaclePos.x &&
        nextPos.y === obstaclePos.y)

    if (isBlocked) {
      // Turn right if blocked
      dir = turnRight(dir)
    } else {
      // Move forward if not blocked
      pos = nextPos

      // Check if guard has left the map
      if (!isInBounds(pos, grid)) {
        break
      }
    }

    steps++
  }

  return visited
}

export function findValidObstaclePlacements(input: string): number {
  const { grid, startPos, startDir } = parseInput(input)
  const validPlacements = new Set<string>()

  // Try placing obstacle at each empty position
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      // Skip if position is not empty or is start position
      if (grid[y][x] !== '.' || (x === startPos.x && y === startPos.y)) {
        continue
      }

      const obstaclePos = { x, y }
      const visited = simulateGuardPath(grid, startPos, startDir, obstaclePos)

      // If the path doesn't lead outside the grid and creates a loop
      if (
        Array.from(visited).every((pos) => {
          const [x, y] = pos.split(',').map(Number)
          return isInBounds({ x, y }, grid)
        })
      ) {
        validPlacements.add(`${x},${y}`)
      }
    }
  }

  return validPlacements.size
}

export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  const processedData = data.split('\n')

  if (dayOne) {
    return partOne(processedData)
  } else {
    return partTwo(data)
  }
}

const partOne = (map: string[]): number => {
  const rows = map.length
  const cols = map[0].length
  const visited = new Set<string>()

  let guardPosition: Position | undefined
  let guardDirection: Direction | undefined

  // Find the initial position of the guard
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = map[row][col]
      if (['^', '>', 'v', '<'].includes(cell)) {
        guardPosition = { row, col }
        guardDirection = cell as Direction
        break
      }
    }
    if (guardPosition) break
  }

  if (!guardPosition || !guardDirection) {
    throw new Error('Guard not found on the map')
  }

  const inBounds = (position: Position): boolean => {
    return (
      position.row >= 0 &&
      position.row < rows &&
      position.col >= 0 &&
      position.col < cols
    )
  }

  const positionKey = (position: Position): string =>
    `${position.row},${position.col}`

  // Track the positions visited by the guard
  visited.add(positionKey(guardPosition))

  while (true) {
    const nextPosition: Position = {
      row: guardPosition.row + directionDeltas[guardDirection].row,
      col: guardPosition.col + directionDeltas[guardDirection].col
    }

    if (!inBounds(nextPosition)) {
      break // Guard has left the map
    }

    if (map[nextPosition.row][nextPosition.col] === '#') {
      // Obstacle ahead, turn right
      guardDirection = turnRight(guardDirection)
    } else {
      // Move forward
      guardPosition = nextPosition
      visited.add(positionKey(guardPosition))
    }
  }

  return visited.size
}

type Direction = '^' | '>' | 'v' | '<'

interface Position {
  row: number
  col: number
}

const directionDeltas: Record<Direction, Position> = {
  '^': { row: -1, col: 0 },
  '>': { row: 0, col: 1 },
  v: { row: 1, col: 0 },
  '<': { row: 0, col: -1 }
}

const turnRight = (direction: Direction): Direction => {
  const order: Direction[] = ['^', '>', 'v', '<']
  return order[(order.indexOf(direction) + 1) % 4]
}

const partTwo = (data: string): number => {
  return 0
}

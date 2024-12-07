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

const partTwo = (data: string): number => {
  const mapStrings = data.split('\n')
  const rows = mapStrings.length
  const cols = mapStrings[0].length

  // Parse the map into a 2D array
  const map = mapStrings.map((row) => row.split(''))

  let guardPosition: Position | undefined
  let guardDirection: Direction | undefined

  // Find the initial position and direction of the guard
  const directionChars: Direction[] = ['^', '>', 'v', '<']
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = map[row][col]
      if (directionChars.includes(cell as Direction)) {
        guardPosition = { row, col }
        guardDirection = cell as Direction
        // Replace guard's starting position with empty space
        map[row][col] = '.'
        break
      }
    }
    if (guardPosition) break
  }

  if (!guardPosition || !guardDirection) {
    throw new Error('Guard not found on the map')
  }

  const positionsToTest: Position[] = []

  // Collect all possible positions to place an obstruction
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = map[row][col]
      if (
        cell === '.' &&
        !(row === guardPosition.row && col === guardPosition.col)
      ) {
        positionsToTest.push({ row, col })
      }
    }
  }

  let validObstructionPositions = 0

  for (const obstruction of positionsToTest) {
    // Copy the map to modify it
    const mapCopy = map.map((row) => [...row])

    // Place the obstruction
    mapCopy[obstruction.row][obstruction.col] = '#'

    // Simulate the guard's movement
    const visitedStates = new Set<string>()
    let currentPosition = { ...guardPosition }
    let currentDirection = guardDirection

    let isLoop = false

    while (true) {
      const stateKey = `${currentPosition.row},${currentPosition.col},${currentDirection}`
      if (visitedStates.has(stateKey)) {
        // Loop detected
        isLoop = true
        break
      }
      visitedStates.add(stateKey)

      const nextPosition: Position = {
        row: currentPosition.row + directionDeltas[currentDirection].row,
        col: currentPosition.col + directionDeltas[currentDirection].col
      }

      if (
        nextPosition.row < 0 ||
        nextPosition.row >= rows ||
        nextPosition.col < 0 ||
        nextPosition.col >= cols
      ) {
        // Guard has left the map
        break
      }

      const nextCell = mapCopy[nextPosition.row][nextPosition.col]

      if (nextCell === '#') {
        // Obstacle ahead, turn right
        currentDirection = turnRight(currentDirection)
      } else {
        // Move forward
        currentPosition = nextPosition
      }
    }

    if (isLoop) {
      validObstructionPositions++
    }
  }

  return validObstructionPositions
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

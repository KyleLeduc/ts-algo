export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  if (dayOne) {
    return partOne(data)
  } else {
    return partTwo(data)
  }
}

const partOne = (grid: string): number => {
  const word = 'XMAS'
  const gridArray = grid.split('\n').map((line) => line.split(''))
  const rows = gridArray.length
  const cols = gridArray[0].length
  let count = 0

  // Direction vectors for 8 possible directions (horizontal, vertical, diagonal)
  const directions = [
    [0, 1], // Right
    [1, 0], // Down
    [1, 1], // Down-right diagonal
    [1, -1], // Down-left diagonal
    [0, -1], // Left
    [-1, 0], // Up
    [-1, -1], // Up-left diagonal
    [-1, 1] // Up-right diagonal
  ]

  const isValid = (x: number, y: number) =>
    x >= 0 && x < rows && y >= 0 && y < cols

  const searchWord = (x: number, y: number, direction: number[]): boolean => {
    for (let i = 0; i < word.length; i++) {
      const newX = x + i * direction[0]
      const newY = y + i * direction[1]
      if (!isValid(newX, newY) || gridArray[newX][newY] !== word[i]) {
        return false
      }
    }
    return true
  }

  // Iterate over every cell in the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // If the cell contains the first letter of the word, check in all directions
      if (gridArray[row][col] === word[0]) {
        for (const direction of directions) {
          if (searchWord(row, col, direction)) {
            count++
          }
        }
      }
    }
  }

  return count
}

const partTwo = (grid: string): number => {
  const gridArray = grid.split('\n').map((line) => line.split(''))
  const rows = gridArray.length
  const cols = gridArray[0].length
  let count = 0

  // Check each position that could be the center 'A' of an X
  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      // Must have an 'A' at the center
      const cell = gridArray[row][col]
      if (cell !== 'A') continue

      // Check top-left and bottom-right diagonal
      const topLeft = gridArray[row - 1][col - 1]
      const bottomRight = gridArray[row + 1][col + 1]
      const hasFirstDiagonal =
        (topLeft === 'M' && bottomRight === 'S') || // MAS
        (topLeft === 'S' && bottomRight === 'M') // SAM

      // Check top-right and bottom-left diagonal
      const topRight = gridArray[row - 1][col + 1]
      const bottomLeft = gridArray[row + 1][col - 1]
      const hasSecondDiagonal =
        (topRight === 'M' && bottomLeft === 'S') || // MAS
        (topRight === 'S' && bottomLeft === 'M') // SAM

      // If both diagonals form valid MAS/SAM patterns, count it
      if (hasFirstDiagonal && hasSecondDiagonal) {
        count++
      }
    }
  }

  return count
}

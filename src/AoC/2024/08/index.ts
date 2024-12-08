export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  if (dayOne) {
    return partOne(data)
  } else {
    return partTwo(data)
  }
}

const partOne = (data: string): number => {
  const map = data.split('\n').map((line) => line.split(''))
  const rows = map.length
  const cols = map[0].length
  const antinodes = new Set<string>()

  const addAntinode = (x: number, y: number) => {
    if (x >= 0 && x < rows && y >= 0 && y < cols) {
      antinodes.add(`${x},${y}`)
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const freq = map[i][j]
      if (freq !== '.') {
        for (let k = 0; k < rows; k++) {
          for (let l = 0; l < cols; l++) {
            if (map[k][l] === freq && (i !== k || j !== l)) {
              const dx = k - i
              const dy = l - j
              const midX = i + dx / 2
              const midY = j + dy / 2
              if (Number.isInteger(midX) && Number.isInteger(midY)) {
                addAntinode(midX, midY)
              }
              addAntinode(i - dx, j - dy)
              addAntinode(k + dx, l + dy)
            }
          }
        }
      }
    }
  }

  return antinodes.size
}

const partTwo = (data: string): number => {
  const map = data.split('\n').map((line) => line.split(''))
  const rows = map.length
  const cols = map[0].length
  const antinodes = new Set<string>()

  const addAntinode = (x: number, y: number) => {
    if (x >= 0 && x < rows && y >= 0 && y < cols) {
      antinodes.add(`${x},${y}`)
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const freq = map[i][j]
      if (freq !== '.') {
        for (let k = 0; k < rows; k++) {
          for (let l = 0; l < cols; l++) {
            if (map[k][l] === freq && (i !== k || j !== l)) {
              const dx = k - i
              const dy = l - j
              for (let m = 1; m <= Math.max(rows, cols); m++) {
                addAntinode(i + dx * m, j + dy * m)
                addAntinode(i - dx * m, j - dy * m)
              }
            }
          }
        }
      }
    }
  }

  return antinodes.size
}

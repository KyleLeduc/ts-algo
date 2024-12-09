interface FileBlock {
  id: number
  size: number
  start: number
  end: number
}

interface FreeSpace {
  start: number
  end: number
  size: number
}

function parseDiskMap(diskMap: string): (number | null)[] {
  const blocks: (number | null)[] = []
  let toggle = true // true for file, false for free space
  let fileId = 0

  for (let i = 0; i < diskMap.length; i++) {
    const len = parseInt(diskMap[i])
    const blockType = toggle ? fileId++ : null
    for (let j = 0; j < len; j++) {
      blocks.push(blockType)
    }
    toggle = !toggle
  }

  return blocks
}

function findFreeSpaces(
  blocks: (number | null)[],
  maxIndex: number
): FreeSpace[] {
  const freeSpaces: FreeSpace[] = []
  let start = -1

  for (let i = 0; i < maxIndex; i++) {
    if (blocks[i] === null) {
      if (start === -1) start = i
    } else {
      if (start !== -1) {
        freeSpaces.push({ start, end: i - 1, size: i - start })
        start = -1
      }
    }
  }

  if (start !== -1) {
    freeSpaces.push({ start, end: maxIndex - 1, size: maxIndex - start })
  }

  return freeSpaces
}

function moveFiles(blocks: (number | null)[], files: FileBlock[]): void {
  files.sort((a, b) => b.id - a.id) // Decreasing file ID order

  for (const file of files) {
    const freeSpaces = findFreeSpaces(blocks, file.start)
    const suitableSpace = freeSpaces.find((space) => space.size >= file.size)

    if (suitableSpace) {
      // Move file to the suitable free space
      for (let i = file.start; i <= file.end; i++) {
        blocks[i] = null // Remove from current position
      }
      for (let i = 0; i < file.size; i++) {
        blocks[suitableSpace.start + i] = file.id
      }
      // Update file positions
      file.start = suitableSpace.start
      file.end = suitableSpace.start + file.size - 1
    }
  }
}

function calculateChecksum(blocks: (number | null)[]): number {
  let checksum = 0
  for (let i = 0; i < blocks.length; i++) {
    const fileId = blocks[i]
    if (fileId !== null) {
      checksum += i * fileId
    }
  }
  return checksum
}

export function compactDisk(diskMap: string): number {
  const blocks = parseDiskMap(diskMap)

  const files: FileBlock[] = []
  let i = 0
  while (i < blocks.length) {
    if (blocks[i] !== null) {
      const fileId = blocks[i]
      const start = i
      while (i < blocks.length && blocks[i] === fileId) i++
      files.push({ id: fileId!, size: i - start, start, end: i - 1 })
    } else {
      i++
    }
  }

  moveFiles(blocks, files)
  return calculateChecksum(blocks)
}

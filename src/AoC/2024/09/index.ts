export { data, pt1Stub, pt2Stub } from './stubs'
import { compactDisk as partTwo } from './partTwo'

export const doWork = (data: string, dayOne = true) => {
  if (dayOne) {
    return partOne(data)
  } else {
    return partTwo(data)
  }
}

interface DiskSegment {
  isFile: boolean
  length: number
}

type DiskBlock = number | null // File ID or null for free space

/**
 * Simulates disk compaction and calculates the filesystem checksum.
 * @param data - The disk map input string.
 * @returns The filesystem checksum after compaction.
 */
const partOne = (data: string): number => {
  // Step 1: Parse the Disk Map
  const segments = parseDiskMap(data)

  // Step 2: Build the Disk Blocks
  const diskBlocks = buildDiskBlocks(segments)

  // Step 3: Simulate Disk Compaction
  compactDisk(diskBlocks)

  // Step 4: Calculate the Filesystem Checksum
  const checksum = calculateChecksum(diskBlocks)

  return checksum
}

/**
 * Parses the input disk map string into disk segments.
 * @param data - The disk map input string.
 * @returns An array of DiskSegment objects.
 */
const parseDiskMap = (data: string): DiskSegment[] => {
  const segments: DiskSegment[] = []
  const digits = data.split('').map(Number)

  for (let i = 0; i < digits.length; i++) {
    const isFile = i % 2 === 0 // Even indices are file lengths
    const length = digits[i]
    if (length > 0) {
      segments.push({ isFile, length })
    }
  }

  return segments
}

/**
 * Constructs the initial disk blocks array from disk segments.
 * @param segments - The array of DiskSegment objects.
 * @returns An array representing disk blocks with file IDs or null for free spaces.
 */
const buildDiskBlocks = (segments: DiskSegment[]): DiskBlock[] => {
  const blocks: DiskBlock[] = []
  let fileId = 0

  for (const segment of segments) {
    const { isFile, length } = segment
    for (let i = 0; i < length; i++) {
      if (isFile) {
        blocks.push(fileId)
      } else {
        blocks.push(null)
      }
    }
    if (isFile) {
      fileId++
    }
  }

  return blocks
}

/**
 * Simulates the disk compaction process.
 * @param blocks - The array representing disk blocks.
 */
const compactDisk = (blocks: DiskBlock[]): void => {
  let freeIndex = blocks.indexOf(null)

  while (freeIndex !== -1) {
    const fileIndex = findRightmostFileBlock(blocks, freeIndex)
    if (fileIndex === -1) {
      break // No more file blocks to move
    }
    // Move the file block to the free space
    blocks[freeIndex] = blocks[fileIndex]
    blocks[fileIndex] = null
    // Update the free index
    freeIndex = blocks.indexOf(null, freeIndex + 1)
  }
}

/**
 * Finds the index of the rightmost file block before the given index.
 * @param blocks - The array representing disk blocks.
 * @param beforeIndex - The index before which to search for a file block.
 * @returns The index of the rightmost file block or -1 if not found.
 */
const findRightmostFileBlock = (
  blocks: DiskBlock[],
  beforeIndex: number
): number => {
  for (let i = blocks.length - 1; i > beforeIndex; i--) {
    if (blocks[i] !== null) {
      return i
    }
  }
  return -1
}

/**
 * Calculates the filesystem checksum after compaction.
 * @param blocks - The array representing disk blocks.
 * @returns The checksum as a number.
 */
const calculateChecksum = (blocks: DiskBlock[]): number => {
  let checksum = 0
  blocks.forEach((block, index) => {
    if (block !== null) {
      checksum += index * block
    }
  })
  return checksum
}

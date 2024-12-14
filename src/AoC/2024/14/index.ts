export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  if (dayOne) {
    return partOne(data)
  } else {
    return partTwo(data)
  }
}

/**
 * Calculates the safety factor based on robot positions after 100 seconds.
 * @param data - Input string containing robots' positions and velocities.
 * @returns The safety factor as a number.
 */
const partOne = (data: string): number => {
  const WIDTH = 101 // Grid width for actual data
  const HEIGHT = 103 // Grid height for actual data
  const TOTAL_SECONDS = 100

  /**
   * Represents a robot with position and velocity.
   */
  interface Robot {
    x: number
    y: number
    vx: number
    vy: number
  }

  /**
   * Parses the input data into an array of Robot objects.
   * @param input - The input string.
   * @returns An array of Robot objects.
   */
  const parseRobots = (input: string): Robot[] => {
    return input.split('\n').map((line) => {
      const posMatch = line.match(/p=(-?\d+),(-?\d+)/)
      const velMatch = line.match(/v=(-?\d+),(-?\d+)/)
      if (posMatch && velMatch) {
        return {
          x: parseInt(posMatch[1], 10),
          y: parseInt(posMatch[2], 10),
          vx: parseInt(velMatch[1], 10),
          vy: parseInt(velMatch[2], 10)
        }
      }
      throw new Error(`Invalid line format: ${line}`)
    })
  }

  /**
   * Computes the new position with wrapping.
   * @param value - Current position value.
   * @param velocity - Velocity component.
   * @param max - Maximum value for the grid dimension.
   * @returns The new position after applying velocity and wrapping.
   */
  const computePosition = (
    value: number,
    velocity: number,
    max: number
  ): number => {
    return (((value + velocity) % max) + max) % max
  }

  /**
   * Determines the quadrant of a given position.
   * @param x - X-coordinate.
   * @param y - Y-coordinate.
   * @returns The quadrant number (1 to 4) or 0 if on the central lines.
   */
  const getQuadrant = (x: number, y: number): number => {
    const midX = Math.floor(WIDTH / 2)
    const midY = Math.floor(HEIGHT / 2)
    if (x === midX || y === midY) return 0
    if (x < midX && y < midY) return 1
    if (x > midX && y < midY) return 2
    if (x < midX && y > midY) return 3
    if (x > midX && y > midY) return 4
    return 0
  }

  const robots = parseRobots(data)

  // Simulate movement for TOTAL_SECONDS
  for (let second = 0; second < TOTAL_SECONDS; second++) {
    robots.forEach((robot) => {
      robot.x = computePosition(robot.x, robot.vx, WIDTH)
      robot.y = computePosition(robot.y, robot.vy, HEIGHT)
    })
  }

  // Count robots in each quadrant
  const quadrantCounts = [0, 0, 0, 0, 0] // Index 0 unused
  robots.forEach((robot) => {
    const quadrant = getQuadrant(robot.x, robot.y)
    if (quadrant >= 1 && quadrant <= 4) {
      quadrantCounts[quadrant]++
    }
  })

  // Calculate safety factor by multiplying quadrant counts
  const safetyFactor =
    quadrantCounts[1] *
    quadrantCounts[2] *
    quadrantCounts[3] *
    quadrantCounts[4]
  return safetyFactor
}

const partTwo = (data: string) => {
  return 0
}

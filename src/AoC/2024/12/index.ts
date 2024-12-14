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
  const visited = new Set<string>()
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ]

  const inBounds = (x: number, y: number) =>
    x >= 0 && x < map.length && y >= 0 && y < map[0].length

  const dfs = (x: number, y: number, plant: string) => {
    const stack = [[x, y]]
    let area = 0
    let perimeter = 0

    while (stack.length) {
      const [cx, cy] = stack.pop()!
      const key = `${cx},${cy}`
      if (visited.has(key)) continue
      visited.add(key)
      area++

      for (const [dx, dy] of directions) {
        const nx = cx + dx
        const ny = cy + dy
        if (inBounds(nx, ny) && map[nx][ny] === plant) {
          stack.push([nx, ny])
        } else if (!inBounds(nx, ny) || map[nx][ny] !== plant) {
          perimeter++
        }
      }
    }

    return { area, perimeter }
  }

  let totalPrice = 0

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      const plant = map[i][j]
      const key = `${i},${j}`
      if (!visited.has(key)) {
        const { area, perimeter } = dfs(i, j, plant)
        totalPrice += area * perimeter
      }
    }
  }

  return totalPrice
}

const partTwo = (data: string): number => {
  const grid = data
    .trim()
    .split('\n')
    .map((r) => r.split(''))
  const rows = grid.length
  const cols = grid[0].length

  // Directions for exploring neighbors (up, right, down, left)
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ]

  // To track visited plots for region identification
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false))

  // Identify all regions
  const regions: { plots: [number, number][]; char: string }[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!visited[r][c]) {
        visited[r][c] = true
        const char = grid[r][c]
        const queue: [number, number][] = [[r, c]]
        const plots: [number, number][] = []

        while (queue.length) {
          const [cr, cc] = queue.pop()!
          plots.push([cr, cc])
          for (const [dr, dc] of directions) {
            const nr = cr + dr
            const nc = cc + dc
            if (
              nr >= 0 &&
              nr < rows &&
              nc >= 0 &&
              nc < cols &&
              !visited[nr][nc] &&
              grid[nr][nc] === char
            ) {
              visited[nr][nc] = true
              queue.push([nr, nc])
            }
          }
        }

        regions.push({ plots, char })
      }
    }
  }

  // For each region, we need to:
  // 1) Determine its boundary edges (like part one),
  // 2) Then determine the number of sides (straight fence segments) of that boundary.
  //
  // A boundary edge is any edge between a region cell and a non-region cell (or out of bounds).
  // To count sides, we need to form polygons from these boundary edges and count the straight segments.
  //
  // Approach to count sides:
  // - We'll represent the boundary as a set of directed edges on a grid of half-integers.
  // - Then, we will follow these edges to form closed loops.
  // - Each loop is a polygon. Count how many times direction changes when traversing the polygon.
  // - The number of direction changes equals the number of sides for a closed polygon loop.
  //
  // Implementation detail:
  // We'll extract boundary edges in a simpler form:
  // Boundary edges occur at edges between adjacent cells. We'll store them as segments between cell centers.
  // Then we walk along these edges to form closed loops.
  //
  // Since we only move in a grid-aligned manner (up/down/left/right), counting direction changes is straightforward:
  // Just walk the loop, count how many edges differ in direction from the previous edge. The number of edges in a polygon equals the number of direction changes.
  //
  // Note: Regions can have holes, so multiple loops are possible. We'll trace each loop and sum sides.

  const getBoundaryEdges = (plots: [number, number][]): Set<string> => {
    const plotSet = new Set(plots.map((p) => p.join(',')))
    const edges = new Set<string>()
    for (const [r, c] of plots) {
      for (let d = 0; d < directions.length; d++) {
        const [dr, dc] = directions[d]
        const nr = r + dr
        const nc = c + dc
        const thisEdgeKey = `${r},${c},${d}`
        // If neighbor is not in the region (or out of bounds), this is a boundary edge.
        if (
          nr < 0 ||
          nr >= rows ||
          nc < 0 ||
          nc >= cols ||
          grid[nr][nc] !== grid[r][c]
        ) {
          // We'll record edges as lines between grid cell centers.
          // Represent edges using "corner coordinates" in a lattice:
          // Each cell can be thought of as spanning from (r, c) to (r+1, c+1).
          // The boundary edges occur along lines where r or c is an integer.
          // Let's represent the edges by their start and end points in a grid coordinate system:
          // Horizontal edge between (r, c) and (r, c+1) could be represented as H:(r+offset)
          // We'll pick a consistent representation:
          // For an upward edge (dr=-1), the edge goes between (r, c) and (r, c+1) horizontally at row r.
          // Actually, to keep it simple: The top-left corner of a cell (r,c) is at coordinate (r,c).
          // The cell occupies [r, r+1] x [c, c+1].
          //
          // Directions:
          // up: edge between (r,c) and (r,c+1) at vertical level r
          // right: edge between (r,c+1) and (r+1,c+1)
          // down: edge between (r+1,c) and (r+1,c+1)
          // left: edge between (r,c) and (r+1,c)
          //
          // We'll store these edges as pairs of endpoints:
          // Endpoint coordinates: (R,C)
          // For up: (r,c) -> (r,c+1)
          // right: (r,c+1) -> (r+1,c+1)
          // down: (r+1,c) -> (r+1,c+1)
          // left: (r,c) -> (r+1,c)
          //
          // We'll normalize the order of endpoints so the "lower/left" endpoint is first.
          let edge: string
          if (dr === -1 && dc === 0) {
            // up edge
            edge = `(${r},${c})-(${r},${c + 1})`
          } else if (dr === 0 && dc === 1) {
            // right edge
            edge = `(${r},${c + 1})-(${r + 1},${c + 1})`
          } else if (dr === 1 && dc === 0) {
            // down edge
            edge = `(${r + 1},${c})-(${r + 1},${c + 1})`
          } else {
            // left edge
            edge = `(${r},${c})-(${r + 1},${c})`
          }
          edges.add(edge)
        }
      }
    }
    return edges
  }

  const parseEdge = (e: string) => {
    // e.g. "(r1,c1)-(r2,c2)"
    const [p1, p2] = e.split('-')
    const parsePoint = (p: string) => {
      const coords = p.replace(/[()]/g, '').split(',')
      return [parseInt(coords[0], 10), parseInt(coords[1], 10)] as [
        number,
        number
      ]
    }
    const pt1 = parsePoint(p1)
    const pt2 = parsePoint(p2)
    return [pt1, pt2] as [[number, number], [number, number]]
  }

  const pointToString = ([r, c]: [number, number]) => `${r},${c}`

  // Build adjacency from edges
  const buildGraph = (edges: Set<string>) => {
    const adj = new Map<string, [number, number][]>()
    for (const e of edges) {
      const [p1, p2] = parseEdge(e)
      const s1 = pointToString(p1)
      const s2 = pointToString(p2)
      if (!adj.has(s1)) adj.set(s1, [])
      if (!adj.has(s2)) adj.set(s2, [])
      adj.get(s1)!.push(p2)
      adj.get(s2)!.push(p1)
    }
    return adj
  }

  // To find loops, pick an unused edge, follow until we return to start
  // While following, record directions.
  // Direction between points:
  // If r is same and c changes: horizontal
  // If c is same and r changes: vertical
  const findLoopsAndCountSides = (adj: Map<string, [number, number][]>) => {
    const visitedEdges = new Set<string>()
    const loopsSidesCount = []

    const normalizeEdgeKey = (a: [number, number], b: [number, number]) => {
      const s1 = pointToString(a)
      const s2 = pointToString(b)
      return s1 < s2 ? `${s1}-${s2}` : `${s2}-${s1}`
    }

    for (const start of adj.keys()) {
      for (const next of adj.get(start)!) {
        const edgeKey = normalizeEdgeKey(
          [parseInt(start.split(',')[0]), parseInt(start.split(',')[1])],
          next
        )
        if (visitedEdges.has(edgeKey)) continue

        // Follow the loop starting from (start -> next)
        const loopEdges: [[number, number], [number, number]][] = []
        let current = next
        let prev = start
        visitedEdges.add(edgeKey)
        loopEdges.push([
          [parseInt(start.split(',')[0]), parseInt(start.split(',')[1])],
          current
        ])

        // Walk until we get back to start
        while (pointToString(current) !== start) {
          const neighbors = adj.get(pointToString(current))!
          // pick the next point that is not prev
          let chosen: [number, number] | null = null
          for (const nb of neighbors) {
            const ek = normalizeEdgeKey(current, nb)
            if (pointToString(nb) !== prev && !visitedEdges.has(ek)) {
              chosen = nb
              visitedEdges.add(ek)
              break
            }
          }
          if (!chosen) {
            // If we didn't find a next edge, this might indicate a complex or malformed shape.
            // Normally, each vertex should have even degree for closed loops.
            // We assume well-formed input based on the puzzle statement.
            break
          }
          loopEdges.push([current, chosen])
          prev = pointToString(current)
          current = chosen
        }

        // Now count sides:
        // Extract directions from loopEdges. Each edge is either horizontal or vertical.
        // Edges form a closed polygon. Count direction changes.
        // Horizontal: (r1==r2), direction could be left or right but we only care about horizontal vs vertical.
        // Vertical: (c1==c2).
        // Count how many times direction changes compared to the previous edge.
        let sidesCount = 0
        let prevDirection: 'H' | 'V' | null = null
        for (let i = 0; i < loopEdges.length; i++) {
          const [[r1, c1], [r2, c2]] = loopEdges[i]
          const dir = r1 === r2 ? 'H' : 'V'
          if (prevDirection === null || dir !== prevDirection) {
            sidesCount++
          }
          prevDirection = dir
        }

        loopsSidesCount.push(sidesCount)
      }
    }

    // Sum sides from all loops
    return loopsSidesCount.reduce((a, b) => a + b, 0)
  }

  let totalPrice = 0

  for (const region of regions) {
    const { plots } = region
    const area = plots.length
    const boundaryEdges = getBoundaryEdges(plots)

    // Build graph of boundary edges
    const adj = buildGraph(boundaryEdges)
    // Find loops and count sides
    const sides = findLoopsAndCountSides(adj)

    const price = area * sides
    totalPrice += price
  }

  return totalPrice
}

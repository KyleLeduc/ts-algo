export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  if (dayOne) {
    return orderPages(data).validSum
  } else {
    return orderPages(data).orderedSum
  }
}

function orderPages(input: string) {
  const { rules, updates } = parseInput(input)
  let validSumOfMiddlePages = 0
  let orderedSumOfMiddlePages = 0

  for (const update of updates) {
    if (isUpdateValid(update, rules)) {
      validSumOfMiddlePages += getMiddlePage(update)
    } else {
      const orderedUpdate = orderUpdate(update, rules)
      orderedSumOfMiddlePages += getMiddlePage(orderedUpdate)
    }
  }

  return {
    validSum: validSumOfMiddlePages,
    orderedSum: orderedSumOfMiddlePages
  }
}

type PageOrderRule = { before: number; after: number }

function parseInput(input: string): {
  rules: PageOrderRule[]
  updates: number[][]
} {
  const sections = input.trim().split('\n\n')
  const rules = sections[0].split('\n').map((line) => {
    const [before, after] = line.split('|').map(Number)
    return { before, after }
  })
  const updates = sections[1]
    .split('\n')
    .map((line) => line.split(',').map(Number))
  return { rules, updates }
}

function isUpdateValid(update: number[], rules: PageOrderRule[]): boolean {
  const positionMap = new Map<number, number>()
  update.forEach((page, index) => positionMap.set(page, index))

  for (const rule of rules) {
    const { before, after } = rule
    if (positionMap.has(before) && positionMap.has(after)) {
      if (positionMap.get(before)! > positionMap.get(after)!) {
        return false
      }
    }
  }
  return true
}

function getMiddlePage(update: number[]): number {
  const middleIndex = Math.floor(update.length / 2)
  return update[middleIndex]
}

function orderUpdate(update: number[], rules: PageOrderRule[]): number[] {
  const dependencyMap = new Map<number, Set<number>>()
  for (const rule of rules) {
    if (!dependencyMap.has(rule.after)) {
      dependencyMap.set(rule.after, new Set())
    }
    dependencyMap.get(rule.after)!.add(rule.before)
  }

  const sortedUpdate: number[] = []
  const visited = new Set<number>()

  function visit(page: number): void {
    if (visited.has(page)) return
    visited.add(page)
    if (dependencyMap.has(page)) {
      for (const dependency of dependencyMap.get(page)!) {
        if (update.includes(dependency)) {
          visit(dependency)
        }
      }
    }
    sortedUpdate.push(page)
  }

  for (const page of update) {
    visit(page)
  }

  return sortedUpdate
}

export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  if (dayOne) {
    return partOne(data)
  } else {
    return partTwo(data)
  }
}

const partOne = (data: string) => {
  const foundMatches = findValidMatches(data)
  const total = foundMatches.reduce((acc, [a, b]) => {
    const sum = a * b

    return acc + sum
  }, 0)

  return total
}

const partTwo = (data: string) => {
  const cleansedData = filterDoDontCommands(data)
  const foundMatches = findValidMatches(cleansedData)

  const total = foundMatches.reduce((acc, [a, b]) => {
    const sum = a * b

    return acc + sum
  }, 0)

  return total
}

const findValidMatches = (data: string) => {
  const re = new RegExp(/mul\((\d{1,3}),(\d{1,3})\)/, 'g')
  const foundMatches = []
  let match

  while ((match = re.exec(data)) !== null) {
    foundMatches.push([Number(match[1]), Number(match[2])])
  }

  return foundMatches
}

const filterDoDontCommands = (data: string) => {
  let matchBin
  const matches: RegExpExecArray[] = []
  const re = new RegExp(/don't\(\)|do\(\)/, 'g')

  while ((matchBin = re.exec(data)) !== null) {
    matches.push(matchBin)
  }

  let result = ''
  let pointer = 0
  let inDont = false

  for (const match of matches) {
    if (match[0] === "don't()" && !inDont) {
      inDont = true
      result += data.slice(pointer, match.index)
    }
    if (match[0] === 'do()' && inDont) {
      inDont = false
      pointer = match.index + 4
    }
  }

  if (pointer < data.length && !inDont) {
    result += data.slice(pointer)
  }

  return result
}

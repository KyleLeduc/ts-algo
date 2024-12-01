const gearRE = /\*/g
const numberRE = /\d+/g

export const doWork2 = (data: string) => {
  const parsedData = processData(data)

  const validNumbers = validateData(parsedData)

  return validNumbers.reduce((prev, curr) => prev + curr, 0)
}

export const validateData = (data: ReturnType<typeof processData>) => {
  const validNumbers: number[] = []

  data.forEach((line, currentLineIdx) => {
    const validLineNumbers: number[] = []

    for (let i = 0; i < line.gearIndices.length; i++) {
      const gearIndex = line.gearIndices[i]
      const gear = isValidGear(gearIndex, currentLineIdx, data)

      if (gear) {
        validLineNumbers.push(gear)
      }
    }

    validNumbers.push(...validLineNumbers)
  })

  return validNumbers
}

const isValidGear = (
  gearIndex: number,
  currentLineIdx: number,
  arr: ReturnType<typeof processData>
): number | null => {
  const maxGearPos = gearIndex + 1
  const minGearPos = gearIndex === 0 ? 0 : gearIndex - 1
  const touchingNumbers: number[] = []

  const currNumberMatch = arr[currentLineIdx].numberIndices
  const prevNumberMatch =
    currentLineIdx !== 0 ? arr[currentLineIdx - 1].numberIndices : []
  const nextNumberMatch =
    currentLineIdx <= arr.length ? arr[currentLineIdx + 1].numberIndices : []

  const numberPositions = [
    ...currNumberMatch,
    ...prevNumberMatch,
    ...nextNumberMatch
  ]

  numberPositions.forEach((numberMatch) => {
    const maxNumberIdx = numberMatch.startIdx + numberMatch.match.length - 1
    const minNumberIdx = numberMatch.startIdx

    if (
      (minGearPos <= maxNumberIdx && minGearPos >= minNumberIdx) ||
      (maxGearPos >= minNumberIdx && maxGearPos <= maxNumberIdx) ||
      (gearIndex === minNumberIdx && gearIndex === maxNumberIdx)
    ) {
      touchingNumbers.push(parseInt(numberMatch.match))
    }
  })

  if (touchingNumbers.length === 2) {
    return touchingNumbers[0] * touchingNumbers[1]
  }

  return null
}

export const processData = (data: string) => {
  const lines = data.split('\n')

  return lines.map((line) => {
    const gearIndices = indexGears(line)
    const numberIndices = indexNumbers(line)

    const lineIndices = {
      gearIndices,
      numberIndices,
      input: line
    }

    return lineIndices
  })
}

export const indexGears = (line: string) => {
  const matches = [...line.matchAll(gearRE)]
  return matches.map((match) => match.index!)
}

export const indexNumbers = (line: string) => {
  const matches = [...line.matchAll(numberRE)]

  return matches.map((match) => {
    return { match: match[0], startIdx: match.index! }
  })
}

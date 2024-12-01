import { data, pt1Stub, pt2Stub } from './stubs'

export { data, pt1Stub, pt2Stub }

const symbolRE = /[%*&@=/#$+-]/g
const numberRE = /\d+/g

export const doWork = (data: string) => {
  const parsedData = processData(data)

  const validNumbers = validateData(parsedData)

  return validNumbers.reduce((prev, curr) => prev + curr, 0)
}

export const validateData = (data: ReturnType<typeof processData>) => {
  const validNumbers: number[] = []

  data.forEach((line, currentLineIdx) => {
    const validLineNumbers: number[] = []

    for (let i = 0; i < line.numberIndices.length; i++) {
      const numberMatch = line.numberIndices[i]

      if (isValidNumber(numberMatch, currentLineIdx, data)) {
        validLineNumbers.push(parseInt(numberMatch.match))
      }
    }

    validNumbers.push(...validLineNumbers)
  })

  return validNumbers
}

const isValidNumber = (
  numberMatch: ReturnType<typeof indexNumbers>[number],
  currentLineIdx: number,
  arr: ReturnType<typeof processData>
): boolean => {
  const { startIdx, match: matchStr } = numberMatch
  const maxSymbolPos = startIdx + matchStr.length
  const minSymbolPos = startIdx === 0 ? 0 : startIdx - 1

  const isCurrentLineValid = arr[currentLineIdx].symbolIndices.some(
    (symbolIdx) => symbolIdx <= maxSymbolPos && symbolIdx >= minSymbolPos
  )

  const isPrevLineValid =
    currentLineIdx > 0 &&
    arr[currentLineIdx - 1].symbolIndices.some(
      (symbolIdx) => symbolIdx <= maxSymbolPos && symbolIdx >= minSymbolPos
    )

  const isNextLineValid =
    currentLineIdx < arr.length - 1 &&
    arr[currentLineIdx + 1].symbolIndices.some(
      (symbolIdx) => symbolIdx <= maxSymbolPos && symbolIdx >= minSymbolPos
    )

  if (isCurrentLineValid || isPrevLineValid || isNextLineValid) return true

  return false
}

export const processData = (data: string) => {
  const lines = data.split('\n')

  return lines.map((line) => {
    const symbolIndices = indexSymbols(line)
    const numberIndices = indexNumbers(line)

    const lineIndices = {
      symbolIndices,
      numberIndices,
      input: line
    }

    return lineIndices
  })
}

export const indexSymbols = (line: string) => {
  const matches = [...line.matchAll(symbolRE)]
  return matches.map((match) => match.index!)
}

export const indexNumbers = (line: string) => {
  const matches = [...line.matchAll(numberRE)]

  return matches.map((match) => {
    return { match: match[0], startIdx: match.index! }
  })
}

export const extractSymbols = (data: string) => {
  const nonSymbolRE = /[^\d.\n]/g
  const symbols = [...data.match(nonSymbolRE)!]
  const uniqueSymbols: string[] = []
  symbols.forEach((symbol) => {
    if (!uniqueSymbols.includes(symbol)) uniqueSymbols.push(symbol)
  })
  console.log(uniqueSymbols.join(''))
}

import { data, pt1Stub, pt2Stub } from './stubs'

export { data, pt1Stub, pt2Stub }

const symbolRE = /[%*&@=/#$+-]/g
const numberRE = /\d+/g

export const doWork = (data: string) => {
  const parsedData = processData(data)

  const validNums = validateData(parsedData)

  return validNums.reduce((prev, curr) => prev + curr, 0)
}

export const validateData = (data: ReturnType<typeof processData>) => {
  const validNumbers: number[] = []

  data.forEach((line, i, arr) => {
    const validLineNumbers: number[] = []

    line.numberIndices.forEach((numberMatch) => {
      const { startIdx, match: matchStr } = numberMatch
      const maxSymbolPos = startIdx + matchStr.length
      const minSymbolPos = startIdx === 0 ? 0 : startIdx - 1

      if (
        line.symbolIndices.some(
          (symbolIdx) => symbolIdx <= maxSymbolPos && symbolIdx >= minSymbolPos
        )
      ) {
        // check current line
        validLineNumbers.push(parseInt(matchStr))

        return
      }

      if (
        i > 0 &&
        arr[i - 1].symbolIndices.some(
          (symbolIdx) => symbolIdx <= maxSymbolPos && symbolIdx >= minSymbolPos
        )
      ) {
        // check previous line
        validLineNumbers.push(parseInt(matchStr))

        return
      }

      if (
        i < arr.length - 1 &&
        arr[i + 1].symbolIndices.some(
          (symbolIdx) => symbolIdx <= maxSymbolPos && symbolIdx >= minSymbolPos
        )
      ) {
        // check next line
        validLineNumbers.push(parseInt(matchStr))

        return
      }
    })

    validNumbers.push(...validLineNumbers)
  })

  return validNumbers
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

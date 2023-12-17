import { data, pt1Stub, pt2Stub } from './stubs'

export { data, pt1Stub, pt2Stub }

const symbolRE = /[%*&@=/#]/g
const numberRE = /\d+/g

export const doWork = (data: string) => {
  const parsedData = processData(data)

  return parsedData
}

export const processData = (data: string) => {
  const lines = data.split('\n')

  return lines.map((line) => {
    const symbolIndexes = indexSymbols(line)
    const numberIndexes = indexNumbers(line)

    const lineIndices = {
      symbolIndexes,
      numberIndexes,
      input: line
    }

    return lineIndices
  })
}

export const indexSymbols = (line: string) => {
  const matches = [...line.matchAll(symbolRE)]
  return matches.map((match) => match.index)
}

export const indexNumbers = (line: string) => {
  const matches = [...line.matchAll(numberRE)]

  return matches.map((match) => {
    return { matchLength: match[0].length, startIdx: match.index }
  })
}

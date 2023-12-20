import { data, pt1Stub, pt2Stub } from './stubs'

export { data, pt1Stub, pt2Stub }

const splitDataRE = /(\d+(?: +\d+)*) +\| +(\d+(?: +\d+)+)\n?/gm

export const doWork = (data: string) => {
  const parsedData = processData(data)

  const dataHash = hashData(parsedData)

  const calculatedScoreCards = calculateScore(dataHash)

  const calculatedScore = calculatedScoreCards.reduce(
    (prev, curr) => prev + curr,
    0
  )

  return calculatedScore
}

const processData = (data: string) => {
  const matches = Array.from(data.matchAll(splitDataRE))

  const transformedData = matches.map((match) => {
    return { winningNumbers: match[1], myNumbers: match[2] }
  })

  return transformedData
}

const hashData = (data: ReturnType<typeof processData>) => {
  return data.map((card) => {
    const winningNumberHash = card.winningNumbers
      .split(' ')
      .reduce((prev: { [key: number]: number }, curr) => {
        const number = parseFloat(curr)
        if (!isNaN(number)) prev[parseFloat(curr)] = 0

        return prev
      }, {})

    card.myNumbers.split(' ').forEach((myNumber) => {
      if (winningNumberHash[parseFloat(myNumber)] !== undefined)
        winningNumberHash[parseFloat(myNumber)] += 1
    })

    return winningNumberHash
  })
}

const calculateScore = (dataHash: ReturnType<typeof hashData>) => {
  const cardScores = dataHash.map((card) => {
    let score = 0

    Object.values(card).forEach((number) => {
      if (number === 1) {
        score === 0 ? (score = 1) : (score = score * 2)
      }
    })

    return score
  })

  return cardScores
}

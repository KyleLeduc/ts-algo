import { data, pt1Stub, pt2Stub } from './stubs'

export { data, pt1Stub, pt2Stub }

export const doWork = (data: string) => {
  const parsedData = processData(data)

  const scoredHands = scoreHands(parsedData)

  const sortedHands = sortHands(scoredHands)

  let totalScore = 0
  sortedHands.forEach((score, i) => {
    totalScore += score.bet * (i + 1)
  })

  return totalScore
}

const handParsingRE = /^(\w*) (\d+)/gm

const sortHands = (scoredHands: ReturnType<typeof scoreHands>) => {
  const sortedByScore = [...scoredHands].sort((a, b) => {
    return a.handScore - b.handScore
  })

  const sortedByCardOrder = [...sortedByScore].sort((a, b) => {
    if (a.handScore !== b.handScore) return 0

    for (let i = 0; i < a.cards.length; i++) {
      const aCard = cardStringToNumber(a.cards[i])
      const bCard = cardStringToNumber(b.cards[i])

      if (aCard > bCard) {
        return 1
      } else if (aCard < bCard) {
        return -1
      }
    }
    return 0
  })

  return sortedByCardOrder
}

export const cardStringToNumber = (card: string) => {
  const normalizedCard = card.toLowerCase()
  if (normalizedCard === 'a') return 14
  if (normalizedCard === 'k') return 13
  if (normalizedCard === 'q') return 12
  if (normalizedCard === 'j') return 11
  if (normalizedCard === 't') return 10
  return parseInt(card)
}

const processData = (data: string) => {
  const matches = [...data.matchAll(handParsingRE)]
  const parsedData = matches.map<{ cards: string; bet: number }>((match) => {
    return { cards: match[1], bet: parseInt(match[2]) }
  })

  return parsedData
}

const scoreHands = (hands: ReturnType<typeof processData>) => {
  const scoredHands = hands.map((hand) => {
    const cards = hand.cards.split('')
    const cardTotals = cards.reduce((prev, curr) => {
      if (!prev[curr]) prev[curr] = 0
      prev[curr]++

      return prev
    }, {} as Record<string, number>)

    const handScore = assignHandScore(cardTotals)

    return { ...hand, handScore }
  })

  return scoredHands
}

const assignHandScore = (cardTotals: Record<string, number>) => {
  const scores = Object.values(cardTotals)
  let handScore = 0
  // 5 of a kind
  if (scores.includes(5)) handScore = 6
  // 4 of a kind
  if (scores.includes(4)) handScore = 5
  // full house
  if (scores.includes(3) && scores.includes(2)) handScore = 4
  // 3 of a kind
  if (scores.includes(3) && scores.length === 3) handScore = 3
  // 2 pair
  if (scores.includes(2) && scores.length === 3) handScore = 2
  // 1 pair
  if (scores.includes(2) && scores.length === 4) handScore = 1
  // high card
  if (scores.length === 5) handScore = 0

  return handScore
}

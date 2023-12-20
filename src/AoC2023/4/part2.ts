import { hashData, processData } from '.'

export const doWork2 = (data: string) => {
  const hashedCards = hashData(processData(data))

  const totalCardsHash = calculateNewCards(hashedCards)

  const totalCards = Object.values(totalCardsHash).reduce(
    (prev, curr) => prev + curr,
    0
  )

  return totalCards
}

const calculateNewCards = (hashedCards: ReturnType<typeof hashData>) => {
  const totalCards: { [key: number]: number } = {}

  hashedCards.forEach((card, i) => {
    const cardCount = Object.values(card).reduce((curr, prev) => curr + prev, 0)
    if (!totalCards[i]) totalCards[i] = 1

    for (let j = 1; j <= cardCount; j++) {
      !totalCards[i + j]
        ? (totalCards[i + j] = 2)
        : (totalCards[i + j] += totalCards[i])
    }
  })

  return totalCards
}

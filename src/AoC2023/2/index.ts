import { data, pt1Stub, pt2Stub } from './stubs'

export { data, pt1Stub, pt2Stub }

export const doWork = (data: string, testCase: GameData) => {
  const parsedData = processData(data)

  const passingGames = testGames(parsedData, testCase)

  return passingGames.reduce((prev, curr) => prev + curr, 0)
}

const testGames = (games: GamesHash, testCase: GameData): number[] => {
  const passingGames: number[] = []

  Object.entries(games).forEach((game) => {
    let isValid = true

    Object.keys(testCase).forEach((testCaseKey) => {
      const key = testCaseKey as keyof GameData

      if (testCase[key] < game[1][key]) {
        isValid = false
        return
      }
    })

    if (isValid) passingGames.push(parseInt(game[0]))
  })

  return passingGames
}

export const processData = (data: string) => {
  const parsedData: GamesHash = {}

  const games = data.split('\n')
  games.forEach((game, i) => {
    const gameNum = i + 1
    if (!parsedData[gameNum]) parsedData[gameNum] = { ...newGameData }

    const rounds = game.split(':')[1].split(';')

    rounds.forEach((round) => {
      const countColor = round.split(',')

      countColor.forEach((value) => {
        const [amountStr, colorStr] = value.trim().split(' ')
        const amount = parseInt(amountStr)
        const color = colorStr as keyof GameData

        if (parsedData[gameNum][color] < amount)
          parsedData[gameNum][color] = amount
      })
    })
  })

  return parsedData
}

const newGameData: GameData = {
  red: 0,
  green: 0,
  blue: 0
}

type GamesHash = {
  [key: number]: GameData
}

type GameData = {
  red: number
  green: number
  blue: number
}

import { data, pt1Stub, pt2Stub } from './stubs'

export { data, pt1Stub, pt2Stub }

export const doWork = (data: string) => {
  const [time, distance] = data.split('\n').map((line) => {
    const values = line.split(':')[1].trim()

    return values.split(/ +/g).map((number) => parseInt(number))
  })
  const winConditions = []

  for (let i = 0; i < time.length; i++) {
    const raceTime = time[i]
    const raceDistance = distance[i]

    winConditions.push(calculateWinConditions(raceTime, raceDistance))
  }

  return winConditions.reduce((prev, curr) => prev * curr)
}

export const doWork2 = (data: string) => {
  const [time, distance] = data.split('\n').map((line) => {
    const values = line.split(':')[1].trim()

    return parseInt(values.split(/ +/g).join(''))
  })

  return calculateWinConditions(time, distance)
}

const calculateWinConditions = (time: number, distance: number) => {
  const startTime = Math.floor(time / 2)
  let holdTime = startTime
  let travelTime = time - holdTime

  while ((holdTime - 1) * (travelTime + 1) > distance) {
    holdTime--
    travelTime = time - holdTime
  }

  return travelTime - holdTime + 1
}

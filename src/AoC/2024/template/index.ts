export { data, pt1Stub, pt2Stub } from './stubs'

export const doWork = (data: string, dayOne = true) => {
  if (dayOne) {
    return partOne(data)
  } else {
    return partTwo(data)
  }
}

const partOne = (data: string) => {
  return 0
}

const partTwo = (data: string) => {
  return 0
}

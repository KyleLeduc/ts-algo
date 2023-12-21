import { data, pt1Stub, pt2Stub } from './stubs'

export { data, pt1Stub, pt2Stub }

export const doWork = (data: string) => {
  console.log(data)
}

export class RangeMap {
  maps = [
    {
      source: 98,
      destination: 50,
      range: 2
    },
    {
      source: 50,
      destination: 52,
      range: 48
    }
  ]

  isInRange(value: number) {
    for (let i = 0; i < this.maps.length; i++) {
      const map = this.maps[i]

      if (value >= map.source && value < map.source + map.range) {
        return map
      }
    }

    return null
  }

  convertSourceToDestination(value: number) {
    const map = this.isInRange(value)
    if (map === null) return value
    const conversion = map.destination - map.source

    return value + conversion
  }
}

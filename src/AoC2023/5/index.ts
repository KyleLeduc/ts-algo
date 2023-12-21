import { data, pt1Stub, pt2Stub } from './stubs'

export { data, pt1Stub, pt2Stub }

export const doWork = (data: string) => {
  const seedsStr = data.split('\n')[0].split(':')[1]
  const seedArr = seedsStr
    .trim()
    .split(' ')
    .map((seed) => parseInt(seed))
  const rangeMapper = new RangeMapFactory(data)

  return rangeMapper.findLowestLocation(seedArr)
}

const mapExtractionRE = /(\d+(?:\s+\d+)*(\n\d+(?:\s+\d+)*)+)/g

type Map = {
  source: number
  destination: number
  range: number
}

export class RangeMapFactory {
  rangeMaps: RangeMap[]

  constructor(mapsData: string) {
    this.rangeMaps = this.init(mapsData)
  }

  init(mapsData: string) {
    return mapsData
      .match(mapExtractionRE)!
      .map((rangeStr) => new RangeMap(rangeStr))
  }

  mapSeed(value: number) {
    return this.rangeMaps.reduce(
      (prev, curr) => curr.convertSourceToDestination(prev),
      value
    )
  }

  findLowestLocation(seeds: number[]) {
    return Math.min(...seeds.map((seed) => this.mapSeed(seed)))
  }
}

export class RangeMap {
  maps: Map[]

  constructor(mapData: string) {
    this.maps = this.init(mapData)
  }

  init(mapData: string): Map[] {
    const rangesHash = mapData.split('\n').map((ranges) => {
      const [destinationStr, sourceStr, rangeStr] = ranges.split(' ')

      const destination = parseFloat(destinationStr)
      const source = parseFloat(sourceStr)
      const range = parseFloat(rangeStr)

      return { destination, source, range }
    })

    return rangesHash
  }

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

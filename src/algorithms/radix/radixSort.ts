export function radixSort(arr: number[]): number[] {
  let longestNumber = 1

  for (let i = 0; i < longestNumber; i++) {
    const positiveBins = Array.from({ length: 10 }, (): number[] => [])
    let negativeBins = Array.from({ length: 10 }, (): number[] => [])

    for (const num of arr) {
      // find the longest number on the first pass
      if (i === 0)
        longestNumber = Math.max(Math.max(`${num}`.length, longestNumber))

      if (num < 0) {
        negativeBins[sortByNthDigit(num, i)].push(num)
      } else {
        positiveBins[sortByNthDigit(num, i)].push(num)
      }
    }

    // reverse the negative bin so it's ordered properly
    negativeBins = negativeBins.reverse()

    arr = [...negativeBins.flat(), ...positiveBins.flat()]
  }

  return arr
}

function sortByNthDigit(num: number, comparePos: number) {
  if (comparePos < 0) throw new Error('comparePos should be > 0')

  if (num < 0) num *= -1
  const str = `${num}`
  const numAtPos = str[str.length - comparePos - 1]

  if (!numAtPos) return 0

  return parseFloat(numAtPos)
}

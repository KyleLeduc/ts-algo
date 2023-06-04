class MergeSort {
  public sortAscending(arr: number[]): number[] {
    return this.sort(arr)
  }

  private sort(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr
    }

    const midIdx = Math.floor(arr.length / 2)
    const leftSlice = arr.slice(0, midIdx)
    const rightSlice = arr.slice(midIdx)

    const left = this.sort(leftSlice)
    const right = this.sort(rightSlice)

    return this.mergeAscending(left, right)
  }

  private mergeAscending(left: number[], right: number[]): number[] {
    const sortedArr: number[] = []
    let i = 0
    let j = 0

    while (i < left.length && j < right.length) {
      const leftItem = left[i]
      const rightItem = right[j]

      if (leftItem < rightItem) {
        sortedArr.push(leftItem)

        i++
      } else {
        sortedArr.push(rightItem)

        j++
      }
    }
    while (i < left.length) {
      sortedArr.push(left[i])

      i++
    }
    while (j < right.length) {
      sortedArr.push(right[j])

      j++
    }

    return sortedArr
  }
}

export default MergeSort

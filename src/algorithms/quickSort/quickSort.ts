export function quickSort(
  arr: number[],
  start = 0,
  stop = arr.length - 1
): number[] {
  if (start < stop) {
    const pivotIdx = pivot(arr, start, stop)

    quickSort(arr, start, pivotIdx - 1)
    quickSort(arr, pivotIdx + 1, stop)
  }

  return arr
}

function pivot(arr: number[], start: number, end: number): number {
  const pivot = arr[start]
  let pivotIdx = start

  for (let i = start + 1; i <= end; i++) {
    const comparison = arr[i]
    if (pivot > comparison) {
      pivotIdx++

      swap(arr, pivotIdx, i)
    }
  }
  swap(arr, pivotIdx, start)

  return pivotIdx
}

function swap(arr: number[], pivotIdx: number, pointerIdx: number) {
  //   console.log('before', arr)
  console.log(arr[pivotIdx], arr[pointerIdx])
  ;[arr[pivotIdx], arr[pointerIdx]] = [arr[pointerIdx], arr[pivotIdx]]

  //   console.log('after', arr)
}

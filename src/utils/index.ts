import util from 'util'

type ArrOptions = {
  maxLen: number
  count: number
}

/**
 * Generate `n` arrays with `m` random positive numbers
 * @param maxNum The highest number generated in the array
 * @param arrayOptions The amount of arrays and their max length
 * @returns An array of number[] meeting the constraints provided in the params
 */
export function generatePositiveNumArrs(
  maxNum = 100,
  arrayOptions: ArrOptions = { maxLen: 100, count: 10 }
) {
  const arrays = []
  const { maxLen, count } = arrayOptions

  for (let i = 0; i < count; i++) {
    // length of the array
    const length = Math.ceil(Math.random() * maxLen) + 1

    // Generate the array
    const arr = Array.from({ length }, () => Math.floor(Math.random() * maxNum))

    // Add the array to the list of arrays
    arrays.push(arr)
  }

  return arrays
}

export const logFullObject = (obj: object) => {
  console.log(
    util.inspect(obj, { showHidden: false, depth: null, colors: true })
  )
}

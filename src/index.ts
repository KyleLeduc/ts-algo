/** Sum of Intervals */
// import { sumOfIntervals, testData } from './algorithms/sumOfIntervals'
// console.log(sumOfIntervals(testData))

/** Merge Sort */
import MergeSort, { data } from './algorithms/mergeSort'
const { unsortedArr } = data
const ms = new MergeSort()

// console.log(ms.sortAscending(unsortedArr))

/** Quick Sort */
import { quickSort, data as qsData } from './algorithms/quickSort'
// console.log('unsorted', qsData[0])
// console.log(quickSort(qsData[0]))

/** Radix Sort */
import { radixSort } from './algorithms/radix'

// console.log(radixSort(qsData[0]))

import { isValid, data as parensData } from './algorithms/validParens'

// console.log(isValid(parensData[2]))

import { shuffleArr, data as shuffleData } from './algorithms/shuffleArray'

// for (const testData of shuffleData) {
//   console.log(shuffleArr(testData.arr, testData.num))
// }

// import { mooresLeaderElection } from './algorithms/majorityElement'

// console.log(mooresLeaderElection([3,2,3,3,2,2]))

import { permuteUnique, uniquePermuteData } from './algorithms/permutations'
// permuteUnique(uniquePermuteData[0].input)

import { doWork2 } from './AoC2023/5'
import { data as day5Data, pt2Stub } from './AoC2023/5'

console.log(doWork2(day5Data))

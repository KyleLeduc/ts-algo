/** Sum of Intervals */
// import { sumOfIntervals, testData } from './algorithms/sumOfIntervals'
// console.log(sumOfIntervals(testData))

/** Merge Sort */
import MergeSort, { data } from './algorithms/mergeSort'
const { unsortedArr } = data
const ms = new MergeSort()

console.log(ms.sortAscending(unsortedArr))

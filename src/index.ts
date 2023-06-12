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
console.log('unsorted', qsData[0])
console.log(quickSort(qsData[0]))

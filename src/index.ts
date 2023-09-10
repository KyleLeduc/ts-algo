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

import { SinglyLinkedList } from './dataStructures/singlyLinkedList'

const list = new SinglyLinkedList<number>()
list.push(10)
list.push(20)

list.unshift(30)

console.log(list)

list.shift()

console.log(list)

import { shuffleArr, data as shuffleData } from './algorithms/shuffleArray'

// for (const testData of shuffleData) {
//   console.log(shuffleArr(testData.arr, testData.num))
// }

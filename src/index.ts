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
list.unshift(30)
list.push(20)
list.shift()

// console.log(list)
// console.log(list.get(0))
// console.log(list.get(-300))
// console.log(list.get(300))

// console.log(list)
// console.log(list.set(0, 100))
// console.log(list.set(100, 0))
// console.log(list)

console.log(list)
console.log(list.insert(0, 1))
console.log(list.insert(-3, 1000))
console.log(list.insert(10, 1000))
console.log(list)

import { shuffleArr, data as shuffleData } from './algorithms/shuffleArray'

// for (const testData of shuffleData) {
//   console.log(shuffleArr(testData.arr, testData.num))
// }

import { describe, it, expect, beforeEach } from 'vitest'
import { SinglyLinkedList, Node } from './'

describe('SinglyLinkedList', () => {
  let linkedList: SinglyLinkedList<number>

  beforeEach(() => {
    linkedList = new SinglyLinkedList<number>()
  })

  it('should print the list to an array', () => {
    const expectedValue = [1, 2, 3]

    for (const value of expectedValue) {
      linkedList.push(value)
    }

    expect(linkedList.toArray()).toStrictEqual([1, 2, 3])
  })

  it('should test unshift', () => {
    const initialValue = 0
    const expectedValue = 3

    linkedList.unshift(initialValue)
    const newListUnshiftHeadIsTail = linkedList.head === linkedList.tail

    linkedList.unshift(expectedValue)
    const unshiftListHeadValue = linkedList.head?.data
    const unshiftListTailValue = linkedList.tail?.data

    expect(newListUnshiftHeadIsTail).toBe(true)
    expect(unshiftListHeadValue).toBe(expectedValue)
    expect(unshiftListTailValue).toBe(initialValue)
    expect(linkedList.length).toBe(2)
  })

  it('should test shift', () => {
    const initialValue = 0
    const expectedValue = 3

    const emptyListShift = linkedList.shift()

    linkedList.push(expectedValue)
    linkedList.push(initialValue)

    const oldHead = linkedList.head?.data
    const shiftedReturn = linkedList.shift()?.data
    const newHead = linkedList.head?.data

    expect(emptyListShift).toBeUndefined()
    expect(shiftedReturn).toBe(expectedValue)
    expect(newHead).toBe(initialValue)
    expect(oldHead).toBe(expectedValue)
  })

  it('should test set return values', () => {
    const initialValue = 0
    const expectedValue = 3

    linkedList.push(initialValue)
    const successfulSet = linkedList.set(0, expectedValue)
    const failedSet = linkedList.set(1000, expectedValue)

    const foundNode = linkedList.get(0)
    const actualValue = foundNode?.data

    expect(actualValue).toBe(expectedValue)
    expect(successfulSet).toBe(true)
    expect(failedSet).toBe(false)
  })

  it('get should return undefined when index is out of bounds', () => {
    const expectedValue = 3
    linkedList.push(expectedValue)

    const notFoundNode = linkedList.get(1000)

    expect(notFoundNode).toBeUndefined()
  })

  it('get should return the node at the provided index', () => {
    const expectedValue = 3
    linkedList.push(expectedValue)

    const foundNode = linkedList.get(0)
    const actualValue = foundNode?.data

    expect(foundNode).toSatisfy((node) => node instanceof Node)
    expect(actualValue).toBe(expectedValue)
  })

  it('should test pop return values', () => {
    const initialValue = 10
    const expectedPoppedValue = 3

    linkedList.push(initialValue)
    linkedList.push(expectedPoppedValue)

    const actualPoppedvalue = linkedList.pop()?.data
    linkedList.pop()
    const emptListPoppedValue = linkedList.pop()

    const emptyListHeadValue = linkedList.head
    const emptyListTailValue = linkedList.tail

    expect(emptyListHeadValue).toBeNull()
    expect(emptyListTailValue).toBeNull()
    expect(emptListPoppedValue).toBeUndefined()
    expect(actualPoppedvalue).toBe(expectedPoppedValue)
  })

  it('should test push return values', () => {
    const expectedValue = 3

    linkedList.push(expectedValue)

    const actualHeadValue = linkedList.head?.data
    const actualTailValue = linkedList.tail?.data

    expect(actualHeadValue).toBe(expectedValue)
    expect(actualTailValue).toBe(expectedValue)
    expect(linkedList.length).toBe(1)
  })

  it('should make a linked list', () => {
    expect(linkedList).toSatisfy((list) => list instanceof SinglyLinkedList)
  })
})

import { describe, expect, it } from 'vitest'
import { Node, BST } from './index'

const createBST = (initialValue: number) => {
  return new BST(new Node(initialValue))
}

describe('BST', () => {
  it('should make a bst', () => {
    const expectedValue = 1
    const bst = createBST(expectedValue)

    expect(bst.root?.value).toBe(expectedValue)
  })

  it('should contain children', () => {
    const leftExpectedValue = 1
    const rightExpectedValue = 35
    const bst = createBST(20)

    expect(bst.root === null).toBe(false)
    if (!bst.root) throw new Error('Root is null')

    bst.root.left = new Node(leftExpectedValue)
    bst.root.right = new Node(rightExpectedValue)

    expect(bst.root.left.value).toBe(leftExpectedValue)
    expect(bst.root.right.value).toBe(rightExpectedValue)
  })

  it('should insert in the correct places', () => {
    const expectedRightValue = 15
    const expectedLeftValue = 3
    const expectedLeftRightValue = 5
    const bst = createBST(10)

    bst.insert(expectedRightValue)
    bst.insert(expectedLeftValue)
    bst.insert(expectedLeftRightValue)

    const actualLeftValue = bst.root?.left?.value
    const actualLeftRightValue = bst.root?.left?.right?.value
    const actualRightValue = bst.root?.right?.value

    expect(actualLeftValue).toBe(expectedLeftValue)
    expect(expectedLeftRightValue).toBe(actualLeftRightValue)
    expect(actualRightValue).toBe(expectedRightValue)
  })
})

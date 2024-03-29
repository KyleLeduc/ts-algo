import type { Nullable } from '../utils'

type NullableNode<T> = Nullable<Node<T>>
export class Node<T> {
  constructor(public data: T, private _next: NullableNode<T> = null) {}

  get next(): NullableNode<T> {
    return this._next
  }

  set next(node: NullableNode<T>) {
    this._next = node
  }
}

export class SinglyLinkedList<T> {
  #head: NullableNode<T> = null
  #tail: NullableNode<T> = null
  #length = 0

  get head() {
    return this.#head
  }

  get tail() {
    return this.#tail
  }

  get length() {
    return this.#length
  }

  push(value: T) {
    const newNode = new Node<T>(value)

    if (!this.#head && !this.#tail) {
      this.#head = newNode
      this.#tail = newNode
    } else {
      this.#tail && (this.#tail.next = newNode)
      this.#tail = newNode
    }

    this.#length++
    return this
  }

  pop() {
    if (!this.#head) return undefined
    if (this.#head === this.#tail) {
      const popped = this.#head
      this.#head = null
      this.#tail = null
      return popped
    }

    let curr = this.#head

    while (curr.next) {
      if (!curr.next.next) {
        const popped = curr.next
        curr.next = null

        this.#length--
        this.#tail = curr

        return popped
      }
      curr = curr.next
    }

    return curr
  }

  shift() {
    if (!this.#head) return undefined

    const oldHead = this.#head
    this.#head = this.#head.next
    this.#length--
    if (this.#length === 0) {
      this.#tail = null
    }

    return oldHead
  }

  unshift(value: T) {
    const newNode = new Node<T>(value)

    newNode.next = this.#head
    this.#head = newNode
    if (this.#length === 0) this.#tail = newNode
    this.#length++
  }

  get(index: number): NullableNode<T> | undefined {
    if (index > this.#length || index < 0) return undefined
    let currentNode = this.#head

    while (index > 0) {
      currentNode && (currentNode = currentNode.next)
      index--
    }

    return currentNode
  }

  set(index: number, value: T) {
    const node = this.get(index)

    if (node) {
      node.data = value

      return true
    }

    return false
  }

  insert(atIndex: number, value: T) {
    if (atIndex === 0) {
      this.unshift(value)
      this.#length++

      return true
    }
    const node = this.get(atIndex - 1)

    if (node) {
      const nextNode = node.next
      const insertedNode = new Node(value)

      node.next = insertedNode
      insertedNode.next = nextNode
      this.#length++

      return true
    }

    return false
  }

  reverse() {
    let next
    let prev = null
    let node = this.head

    this.#tail = this.head

    while (node) {
      next = node.next

      node.next = prev

      prev = node

      node = next
    }

    this.#head = prev

    return this
  }

  toArray() {
    if (!this.#head) return

    const result: T[] = []
    let node: NullableNode<T> = this.#head

    while (node) {
      result.push(node.data)

      node = node.next
    }

    return result
  }
}

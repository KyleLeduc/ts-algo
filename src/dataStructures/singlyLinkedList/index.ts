type Nullable<T> = T | null

type NullableNode<T> = Nullable<Node<T>>

export class SinglyLinkedList<T> {
  private head: NullableNode<T> = null
  private tail: NullableNode<T> = null
  private length = 0

  push(value: T) {
    const newNode = new Node<T>(value)

    if (!this.head && !this.tail) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail && (this.tail.next = newNode)
      this.tail = newNode
    }

    this.length++
    return this
  }

  pop() {
    if (!this.head) return undefined
    if (this.head === this.tail) {
      const popped = this.head
      this.head = null
      this.tail = null
      return popped
    }

    let curr = this.head

    while (curr.next) {
      if (!curr.next.next) {
        const popped = curr.next
        curr.next = null

        this.length--
        this.tail = curr

        return popped
      }
      curr = curr.next
    }

    return curr
  }
}

class Node<T> {
  constructor(public data: T, private _next: NullableNode<T> = null) {}

  get next(): NullableNode<T> {
    return this._next
  }

  set next(node: NullableNode<T>) {
    this._next = node
  }
}

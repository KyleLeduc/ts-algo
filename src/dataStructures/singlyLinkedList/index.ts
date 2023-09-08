export class SinglyLinkedList<T> {
  constructor(private head?: Node<T>, private tail?: Node<T>) {}

  push(value: T) {
    const newNode = new Node<T>(value)

    if (!this.head && !this.tail) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail && (this.tail.next = newNode)
      this.tail = newNode
    }

    return this
  }
}

class Node<T> {
  constructor(public data: T, private _next: Node<T> | null = null) {}

  get next(): Node<T> | null {
    return this._next
  }

  set next(node: Node<T>) {
    this._next = node
  }
}

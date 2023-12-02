import { Nullable } from '../utils'

type NullableNode = Nullable<Node>

export class Node {
  constructor(
    public value: number,
    public right: NullableNode = null,
    public left: NullableNode = null
  ) {}
}

export class BST {
  constructor(public root: NullableNode = null) {}

  insert(value: number) {
    const newNode = new Node(value)
    let inserted = false

    if (!this.root) {
      this.root = newNode
    } else {
      let curr = this.root

      while (!inserted) {
        const { left, right } = curr

        if (value < curr.value) {
          if (left === null) {
            curr.left = newNode
            inserted = true
          } else {
            curr = left
          }
        } else if (right === null) {
          curr.right = newNode
          inserted = true
        } else {
          curr = right
        }
      }
    }
  }
}

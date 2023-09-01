export const data = ['{[()]}', '[]{}({)}']

export function isValid(s: string): boolean {
  const stack: string[] = []
  const openers = new Set(['(', '{', '['])
  const closers: { [key: string]: string } = {
    ')': '(',
    '}': '{',
    ']': '['
  }

  for (const char of s) {
    if (openers.has(char)) {
      stack.push(char)
    } else if (closers[char]) {
      if (stack.pop() !== closers[char]) {
        return false
      }
    }
  }

  return stack.length === 0
}

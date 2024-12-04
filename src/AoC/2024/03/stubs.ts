import { readFileSync } from 'fs'
export const pt1Stub = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

export const pt2Stub = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

export const data = readFileSync(`${__dirname}/data.txt`, 'utf-8')

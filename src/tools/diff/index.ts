export const longestSubString = (firstStr: string, secondStr: string) => {
  if (firstStr.length === 0 && secondStr.length === 0) return ''

  const recurse = (
    remainingFirstStr: string,
    remainingSecondStr: string,
    matches: string[] = []
  ) => {
    console.log('first: ', remainingFirstStr)
    console.log('second: ', remainingSecondStr)
    console.log('matches:', matches)
    if (remainingFirstStr.length <= 0 || remainingSecondStr.length <= 0) {
      if (matches.length === 0) return ''
      return matches.join('')
    }

    if (remainingFirstStr.startsWith(remainingSecondStr[0])) {
      const newMatches = [...matches, remainingFirstStr[0]]

      recurse(
        remainingFirstStr.slice(1),
        remainingSecondStr.slice(1),
        newMatches
      )
    } else {
      recurse(remainingFirstStr, remainingSecondStr.slice(1), matches)
    }
  }

  //   check firstLetter the entire secondStr
  //   if match add to subsequence & recurse starting at second letter
  //   once at end of secondStr, if subsequence.length > 0 add to matches
  //   to optimize only add to matches if same length or longer
  //     for (const [index, firstLetter] of Object.entries(firstStr)) {
  //       const subsequence: string[] = []

  //     }

  for (const [i, firstLetter] of Object.entries(firstStr)) {
    for (const [j, secondLetter] of Object.entries(secondStr)) {
      if (firstLetter === secondLetter) {
        recurse(firstStr.slice(+i + 1), secondStr.slice(+j + 1))
      }
    }
  }

  return recurse(firstStr, secondStr)
}

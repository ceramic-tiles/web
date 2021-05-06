export const formatAnchorStatus = (anchorStatus: number) => {
  switch (anchorStatus) {
    case 0:
      return 'NOT_REQUESTED (0)'
    case 1:
      return 'PENDING (1)'
    case 2:
      return 'PROCESSING (2)'
    case 3:
      return 'ANCHORED (3)'
    case 4:
      return 'FAILED (4)'
    default:
      break
  }
}

export const truncate = (
  fullStr: string,
  strLen: number,
  separator?: string
) => {
  if (fullStr.length <= strLen) return fullStr

  separator = separator || '…'

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2)

  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  )
}

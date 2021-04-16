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
export const isValidHeadlight = (
  percuntal: number,
  headlightstart: number,
  headlightend: number,
): boolean => {
  return headlightstart <= percuntal && headlightend >= percuntal
}

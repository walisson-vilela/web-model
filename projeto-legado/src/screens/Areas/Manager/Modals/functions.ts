export const tabsFormatterValue = (value: number): string | number => {
  return value === 0 ? value : value.toString().padStart(2, '0')
}

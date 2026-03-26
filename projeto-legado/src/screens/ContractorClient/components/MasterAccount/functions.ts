import { numberOrDefault } from '../../../../utils/Formatters'

const formatNumber = (value: number): string => {
  let formattedValue = value.toFixed(2)

  formattedValue = parseFloat(formattedValue).toString()

  return formattedValue
}

export const getSpace = (v: unknown): string => {
  const value = numberOrDefault(v)

  if (value === null) return null

  const units = ['tb', 'gb', 'mb', 'kb']

  for (let i = 0; i < units.length; i++) {
    const q = Math.pow(1024, units.length - i)
    if (value >= q) {
      return [formatNumber(value / q), units[i].toUpperCase()].join(' ')
    }
  }

  return [formatNumber(value), 'B'].join(' ')
}

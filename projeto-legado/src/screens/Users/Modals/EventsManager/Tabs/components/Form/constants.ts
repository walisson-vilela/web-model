import { FormInterface } from './interfaces'

export const TYPES = {
  TEMPORARY: 'T',
  DEFINITIVE: 'P',
} as const

export const DEFAULTS: FormInterface = {
  type: TYPES.TEMPORARY,
  classification: null,
  start: '',
  end: '',
  file: null,
} as const

export const FILE_TYPES = [
  'image/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword,application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
] as const

export const getMinDate = (type: string) => {
  const dTemp = new Date()
  if (type === TYPES.DEFINITIVE) return dTemp

  dTemp.setDate(dTemp.getDate() - 10)
  dTemp.setHours(0, 0, 0, 0)
  return dTemp
}

export const getMaxDate = () => {
  const dTemp = new Date()
  dTemp.setDate(1)
  dTemp.setMonth(11)
  dTemp.setDate(31)
  dTemp.setFullYear(dTemp.getFullYear() + 1)
  dTemp.setHours(23, 59, 59, 999)
  return dTemp
}

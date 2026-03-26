import { TYPES } from './constants'

type Types = (typeof TYPES)[keyof typeof TYPES]

export type Classification = {
  id: number
  name: string
  require_file: boolean
}

export interface FormInterface {
  type: Types
  classification: Classification | null
  start: string
  end: string
  file: File | null
}

export type EventDates = { [K: string]: Date[] }

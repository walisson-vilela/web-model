import { GenericObject } from '@mw-kit/mw-ui/types'

export type Intervals = {
  starts_at: string
  ends_at: string
  name: string
  start_limit: string
  flag: boolean
}

export type Weekdays = {
  weekday: number
  weekday_label: string
  starts_at: string
  ends_at: string
  intervals: Intervals[]
}

export type MainForm = {
  id?: number
  electronic_point: boolean
  tolerance_before: number
  tolerance_after: number
  weekdays: Weekdays[]
}

export type AuxForm = {
  interval: boolean
  weekdays: number[]
  starts_at: string
  ends_at: string
  name: string
  start_limit: string
  flag: boolean
}

export type Errors<Value extends GenericObject> = Partial<{
  [Field in keyof Value]: {
    code: string
    message: string
  }
}>

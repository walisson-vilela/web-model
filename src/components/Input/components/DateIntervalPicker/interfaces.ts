import type { AbsoluteIntervalCalendarProps } from '../../../Calendar/interfaces'
import type { InputProps } from '../Input/interfaces'

type Value = [string, string]

export type IntervalType = 'day' | 'week' | 'month' | 'custom'
export interface DateIntervalPickerProps
  extends React.HTMLAttributes<HTMLInputElement>,
    Pick<
      InputProps,
      | 'label'
      | 'invalid'
      | 'required'
      | 'disabled'
      | 'width'
      | 'borderless'
      | 'paddingless'
    > {
  type: 'date-interval-picker'
  value: Value
  setValue: (value: Value) => void
  getLabel?: (value: Value) => string
  center?: {
    x: number
    y: number
  }
  max?: Date
  min?: Date
  only?: IntervalType
  calendar?: Omit<
    AbsoluteIntervalCalendarProps,
    'initialValue' | 'onSubmit' | 'invalid' | 'open' | 'center'
  >
}

export interface Variation {
  label: (prev: [Date, Date]) => string
  initial: (base?: Date) => [Date, Date]
  increment?: (prev: [Date, Date]) => [Date, Date]
  decrement?: (prev: [Date, Date]) => [Date, Date]
  getMinMax?: (min?: Date, max?: Date) => { min?: Date; max?: Date }
}

export type IntervalTypes = { [key in IntervalType]: Variation }

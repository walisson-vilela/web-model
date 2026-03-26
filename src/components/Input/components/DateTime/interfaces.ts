import type { AbsoluteSingleCalendarProps } from '../../../Calendar/interfaces'
import type { InputProps } from '../Input/interfaces'

export interface DateTimeProps
  extends Omit<InputProps, 'type' | 'mask' | 'icon' | 'min' | 'max'> {
  type: 'datetime'
  picker?:
    | true
    | Omit<
        AbsoluteSingleCalendarProps,
        'initialValue' | 'onSubmit' | 'invalid' | 'open'
      >
  value?: string
  max?: Date
  min?: Date
  seconds?: boolean
  step?: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
}

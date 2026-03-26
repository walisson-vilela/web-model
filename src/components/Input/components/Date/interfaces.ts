import type { AbsoluteSingleCalendarProps } from '../../../Calendar/interfaces'
import type { InputProps } from '../Input/interfaces'

export interface DateProps
  extends Omit<InputProps, 'type' | 'mask' | 'icon' | 'min' | 'max'> {
  type: 'date'
  picker?:
    | true
    | Omit<
        AbsoluteSingleCalendarProps,
        'initialValue' | 'onSubmit' | 'invalid' | 'open'
      >
  value?: string
  max?: Date
  min?: Date
}

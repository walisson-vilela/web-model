import type { AbsoluteSingleCalendarProps } from '../../../Calendar/interfaces'
import type { InputProps } from '../Input/interfaces'

export interface DatePickerProps
  extends Omit<
    InputProps,
    | 'type'
    | 'mask'
    | 'icon'
    | 'htmlDisabled'
    | 'htmlReadonly'
    | 'clearable'
    | 'onPressEnter'
    | 'min'
    | 'max'
    | 'children'
  > {
  type: 'datepicker'
  picker?:
    | true
    | Omit<
        AbsoluteSingleCalendarProps,
        'initialValue' | 'onSubmit' | 'invalid' | 'open'
      >
  value: string
  setValue: (value: string) => void
  max?: Date
  min?: Date
}

import type { AbsoluteContainerProps } from '../../../AbsoluteContainer/interfaces'
import type { TimeProps } from '../../../Input/components/Time/interfaces'
import type { BasicCalendarProps } from '../Basic/interfaces'

type Value = Date | null

type InputTimeProps = Omit<
  TimeProps,
  'type' | 'value' | 'setValue' | 'minWidth'
>

export interface Common
  extends Pick<
      BasicCalendarProps,
      | 'initialMonth'
      | 'max'
      | 'min'
      | 'onChangeMonth'
      | 'label'
      | 'calendar'
      | 'paddingless'
    >,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  initialValue?: Value
  value?: [Value, (value: Value) => void]
  time?: true | InputTimeProps | ((value: Value) => InputTimeProps | undefined)
  onSubmit?: {
    onClick: (value: Value) => void
    disabled?: boolean
  }
  invalid?: [boolean, (invalid: boolean) => void]
  getDay?: (day: Date) => Partial<ReturnType<BasicCalendarProps['getDay']>>
}

export type AbsoluteSingleCalendarProps = Common &
  Omit<AbsoluteContainerProps, 'onSubmit'>

export type SingleCalendarProps =
  | ({ absolute?: undefined } & Common)
  | ({ absolute: true } & AbsoluteSingleCalendarProps)

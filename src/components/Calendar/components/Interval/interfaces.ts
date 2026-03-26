import type { AbsoluteContainerProps } from '../../../AbsoluteContainer/interfaces'
import type { ButtonProps } from '../../../Button/interfaces'
import type { TimeProps } from '../../../Input/components/Time/interfaces'
import type { BasicCalendarProps } from '../Basic/interfaces'

export type Value = [Date | null, Date | null]

export type InputTimeProps = Omit<
  TimeProps,
  'type' | 'value' | 'setValue' | 'minWidth'
>

type GetInputTimeProps = (value: Date | null) => InputTimeProps | undefined

type OnChangeMonth = Exclude<BasicCalendarProps['onChangeMonth'], undefined>

export interface Common
  extends Pick<BasicCalendarProps, 'initialMonth' | 'max' | 'min'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  initialValue?: Value
  value?: [Value, (value: Value) => void]
  time?:
    | true
    | [
        GetInputTimeProps | InputTimeProps | undefined,
        GetInputTimeProps | InputTimeProps | undefined,
      ]
  onSubmit?: Omit<ButtonProps, 'type' | 'onClick'> & {
    onClick: (value: Value) => void
  }
  invalid?: [[boolean, boolean], (invalid: [boolean, boolean]) => void]

  onChangeMonth?: (
    calendar: Parameters<OnChangeMonth>[0],
    side: 'left' | 'right',
  ) => ReturnType<OnChangeMonth>

  getDay?: (
    day: Date,
    side: 'left' | 'right',
  ) => Partial<ReturnType<BasicCalendarProps['getDay']>>
}

export type AbsoluteIntervalCalendarProps = Common &
  Omit<AbsoluteContainerProps, 'onSubmit'>

export type IntervalCalendarProps =
  | (Common & { absolute?: undefined })
  | (AbsoluteIntervalCalendarProps & { absolute: true })

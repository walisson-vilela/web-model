import { BasicCalendarProps } from '@mw-kit/mw-ui/dist/components/Calendar/interfaces'

export type PeriodInputProps = {
  minDate: Date
  maxDate: Date
  onChangeMonth: BasicCalendarProps['onChangeMonth']
  getDay: BasicCalendarProps['getDay']
}

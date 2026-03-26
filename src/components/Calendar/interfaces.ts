import type {
  AbsoluteIntervalCalendarProps,
  AbsoluteSingleCalendarProps,
  BasicCalendarProps,
  IntervalCalendarProps,
  SingleCalendarProps,
} from './components/interfaces'

type CalendarProps =
  | (BasicCalendarProps & { type: 'basic' })
  | (IntervalCalendarProps & { type: 'interval' })
  | (SingleCalendarProps & { type: 'single' })

export type {
  CalendarProps,
  BasicCalendarProps,
  IntervalCalendarProps,
  AbsoluteIntervalCalendarProps,
  SingleCalendarProps,
  AbsoluteSingleCalendarProps,
}

import React from 'react'

import { BasicCalendar, IntervalCalendar, SingleCalendar } from './components'
import type { CalendarProps } from './interfaces'

const Calendar = React.forwardRef(
  (props: CalendarProps, ref?: React.ForwardedRef<HTMLDivElement>) => {
    switch (props.type) {
      case 'basic': {
        return <BasicCalendar {...props} ref={ref} />
      }
      case 'interval': {
        return <IntervalCalendar {...props} ref={ref} />
      }
      case 'single': {
        return <SingleCalendar {...props} ref={ref} />
      }
    }
  },
)

Calendar.displayName = 'Input'

export { BasicCalendar, IntervalCalendar, SingleCalendar } from './components'

export default Calendar

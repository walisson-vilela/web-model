import type React from 'react'

import type { ReactNode } from '../../../../interfaces'
import type { ColorOptions } from '../../../../theme/interfaces'
import type { AbsoluteContainerProps } from '../../../AbsoluteContainer/interfaces'
import type { IndicatorProps } from '../../../Indicator/interfaces'

export interface CalendarInterface {
  month: number
  year: number
  weeks: Date[][]
}

export type DayAppearance = 'active' | 'highlight' | 'disabled'

export interface Common extends React.HTMLAttributes<HTMLDivElement> {
  label?: ReactNode
  initialMonth?: Date
  max?: Date
  min?: Date
  getDay: (date: Date) => {
    appearance?: DayAppearance
    activeColor?: ColorOptions
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    onMouseOver?: React.MouseEventHandler<HTMLButtonElement>
    onMouseOut?: React.MouseEventHandler<HTMLButtonElement>
    indicator?: IndicatorProps['type']
  }
  onChangeMonth?: (
    calendar: CalendarInterface & {
      firstDay: Date
      lastDay: Date
    },
  ) => Promise<void>
  calendar?: [
    CalendarInterface,
    React.Dispatch<React.SetStateAction<CalendarInterface>>,
  ]
  paddingless?: true
}

export type BasicCalendarProps =
  | (Common & { absolute?: undefined })
  | (Common & { absolute: true } & AbsoluteContainerProps)

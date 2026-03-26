import type React from 'react'

import type { IndicatorProps } from '@mw-kit/mw-ui/dist/components/Indicator/interfaces'
import type { ColorOptions } from '@mw-kit/mw-ui/dist/theme/interfaces'

import type { ModalOptions } from './contexts/Modal/types'

export type TabId =
  | 'NATIONAL_HOLIDAY'
  | 'REGIONAL_HOLIDAY'
  | 'MEETING'
  | 'COLLECTIVE_VACATION'

export type HighlightDate = {
  date: Date
  color?: ColorOptions
}

export type ReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export type TabComponent = React.VoidFunctionComponent & {
  modals: ModalOptions
}

export type CardStatusOptions = {
  CONCLUDED: 'C'
  INACTIVATED: 'IN'
  INTERRUPTED: 'I'
  ACTIVE: 'S'
}

export type CardStatusValues = CardStatusOptions[keyof CardStatusOptions]

export type CardStatusConfig = {
  [K in keyof CardStatusOptions]: {
    label: string
    value: CardStatusOptions[K]
    indicatorType: IndicatorProps['type']
    dateColor?: ColorOptions
  }
}

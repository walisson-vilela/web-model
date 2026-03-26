import { useMemo } from 'react'

import type { PopupPlacement, PopupProps } from '../../types'

const FALLBACK_PLACEMENTS = {
  top: ['top-start', 'top-end', 'bottom', 'right', 'left'],
  'top-start': ['top', 'top-end', 'right-start', 'left-start', 'bottom-start'],
  'top-end': ['top', 'top-start', 'right-end', 'left-end', 'bottom-end'],

  right: ['right-start', 'right-end', 'bottom', 'top', 'left'],
  'right-start': [
    'right',
    'right-end',
    'bottom-start',
    'top-start',
    'left-start',
  ],
  'right-end': ['right', 'right-start', 'bottom-end', 'top-end', 'left-end'],

  bottom: ['bottom-start', 'bottom-end', 'top', 'right', 'left'],
  'bottom-start': [
    'bottom',
    'bottom-end',
    'right-start',
    'left-start',
    'top-start',
  ],
  'bottom-end': ['bottom', 'bottom-start', 'right-end', 'left-end', 'top-end'],

  left: ['left-start', 'left-end', 'bottom', 'top', 'right'],
  'left-start': [
    'left',
    'left-end',
    'bottom-start',
    'top-start',
    'right-start',
  ],
  'left-end': ['left', 'left-start', 'bottom-end', 'top-end', 'right-end'],
} satisfies { [K in PopupPlacement]: PopupPlacement[] }

const useFallbackPlacements = (props: PopupProps) => {
  const { placement, fallbackPlacements } = props

  const fallbackList = useMemo(() => {
    if (fallbackPlacements && fallbackPlacements.length > 0) {
      return fallbackPlacements
    }

    return FALLBACK_PLACEMENTS[placement]
  }, [fallbackPlacements, placement])

  return fallbackList
}

export default useFallbackPlacements

import React from 'react'

import { MwEllipsisContainer, MwIndicator } from '@mw-kit/mw-ui'
import type { Filter } from '@mw-kit/mw-ui/types'

import { keys } from '../../../../../../utils/Formatters'
import { CARD_STATUS } from '../../constants'

export const filters: Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: keys(CARD_STATUS).map((key) => {
      const { label, value, indicatorType } = CARD_STATUS[key]
      return {
        label: {
          text: label,
          element: (
            <MwIndicator type={indicatorType}>
              <MwEllipsisContainer> {label} </MwEllipsisContainer>
            </MwIndicator>
          ),
        },
        value: value,
      }
    }),
  },
]

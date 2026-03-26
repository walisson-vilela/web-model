import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../components/Bullet'
import { segments as getSegmentsOptions } from '../../../../services/options'

import { statusColors } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: Object.keys(statusColors).map((key, index) => {
      return {
        label: <Bullet content={key} color={statusColors[key]} />,
        value: key === 'Dentro' ? 1 : 0,
      }
    }),
  },
  {
    label: 'Canal',
    name: 'segment_id',
    options: getSegmentsOptions,
  },
]

export default filters

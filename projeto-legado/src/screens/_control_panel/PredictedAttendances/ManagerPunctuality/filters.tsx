import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../components/Bullet'
import { segments as getSegmentsOptions } from '../../../../services/options'

import { status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'punctuality_status',
    options: Object.keys(statusLabels)
      .reverse()
      .map((key) => {
        const { name, color } = { ...statusLabels[key] }

        const option: FiltersInterfaces.Option = {
          label: <Bullet content={name} color={color} />,
          value: key,
        }

        return option
      }),
  },
  {
    label: 'Canal',
    name: 'segment_id',
    options: getSegmentsOptions,
  },
]

export default filters

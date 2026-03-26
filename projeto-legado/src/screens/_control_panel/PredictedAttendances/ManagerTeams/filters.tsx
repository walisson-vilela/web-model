import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../components/Bullet'
import { justifications as getJustificationsOptions } from '../../../../services/options'

import { COLORS } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Performance',
    name: 'attendance_performance',
    options: [
      {
        label: <Bullet color={COLORS.red} content='0 a 75%' />,
        value: 1,
      },
      {
        label: <Bullet color={COLORS.yellow} content='75 a 95%' />,
        value: 2,
      },
      {
        label: <Bullet color={COLORS.green} content='95 a 100%' />,
        value: 3,
      },
    ],
  },
  {
    label: 'Pontualidade',
    name: 'punctuality_performance',
    options: [
      {
        label: <Bullet color={COLORS.red} content='0 a 75%' />,
        value: 1,
      },
      {
        label: <Bullet color={COLORS.yellow} content='75 a 95%' />,
        value: 2,
      },
      {
        label: <Bullet color={COLORS.green} content='95 a 100%' />,
        value: 3,
      },
    ],
  },
  {
    label: 'Justificativa',
    name: 'justify_id',
    options: getJustificationsOptions,
  },
]

export default filters

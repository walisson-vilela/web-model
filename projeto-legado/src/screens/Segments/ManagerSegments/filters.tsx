import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../components/Bullet'

import { status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
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
    label: 'Tipo',
    name: 'default',
    options: [
      { label: 'Padrão', value: 1 },
      { label: 'Personalizado', value: 0 },
    ],
  },
]

export default filters

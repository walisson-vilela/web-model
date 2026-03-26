import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../../../components/Bullet'
import { roles } from '../../../../../../services/options'

const statusLabels: {
  [key: string | number]: {
    color: string
    name: string
  }
} = {
  1: { color: '#66bb6a', name: 'Ativo' },
  0: { color: '#ef5350', name: 'Inativo' },
}

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'active',
    options: Object.keys(statusLabels)
      .reverse()
      .map((key) => {
        const { name, color } = statusLabels[key]

        const option: FiltersInterfaces.Option = {
          label: <Bullet content={name} color={color} />,
          value: key,
        }

        return option
      }),
  },
  {
    label: 'Funções',
    name: 'role_id',
    options: roles,
  },
  {
    label: 'Acão',
    name: 'accepted',
    options: [
      { label: 'Aceito', value: 1 },
      { label: 'Sem Ação', value: 'null' },
    ],
  },
]

export default filters

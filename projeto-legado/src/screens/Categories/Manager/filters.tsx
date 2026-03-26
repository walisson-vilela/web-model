import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../components/Bullet'

import { status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: Object.keys(statusLabels).map((key) => {
      const { name, color } = statusLabels[key]

      const option: FiltersInterfaces.Option = {
        label: <Bullet content={name} color={color} />,
        value: key,
      }

      return option
    }),
  },
  {
    label: 'Classificação',
    name: 'classification',
    options: [
      { label: 'Categoria', value: 0 },
      { label: 'Subnível', value: 1 },
    ],
  },
  {
    label: 'Nível da Vinculação',
    name: 'level',
    options: [
      { label: '1º Nível', value: 0 },
      { label: '2º Nível', value: 1 },
      { label: '3º Nível', value: 2 },
    ],
  },
]

export default filters

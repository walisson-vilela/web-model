import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../components/Bullet'
import { cities, flags, states } from '../../../services/options'

import { status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'active',
    options: Object.keys(statusLabels)
      .reverse()
      .map((key) => {
        const { name, color, value } = { ...statusLabels[key] }

        const option: FiltersInterfaces.Option = {
          label: <Bullet content={name} color={color} />,
          value,
        }

        return option
      }),
  },
  {
    label: 'Particularidade',
    name: 'particularities',
    options: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
  {
    label: 'Forma de Rateio',
    name: 'apportionment',
    options: [
      { label: 'Linear', value: 0 },
      { label: 'Ponderado Faturamento', value: 1 },
      { label: 'Não se Aplica', value: 2 },
    ],
  },
  {
    label: 'Bandeira',
    name: 'market_flag_id',
    options: flags,
  },
  {
    label: 'Cidade',
    name: 'city_id',
    options: cities,
  },
  {
    label: 'Estado',
    name: 'state_id',
    options: states,
  },
]

export default filters

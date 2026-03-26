import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../components/Bullet'
import { roles as rolesOptionsLoader } from '../../../../services/options'

import { status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'active',
    options: Object.keys(statusLabels).map((key) => {
      const { name, color } = { ...statusLabels[key] }

      const option: FiltersInterfaces.Option = {
        label: <Bullet content={name} color={color} />,
        value: key,
      }

      return option
    }),
  },
  {
    label: 'Função',
    name: 'role_id',
    options: rolesOptionsLoader,
  },
  {
    label: 'Possui Roteiro',
    name: 'has_roadmap',
    options: [
      { label: 'Sim', value: 'Sim' },
      { label: 'Não', value: 'Não' },
    ],
  },
  {
    label: 'Possui Carteira',
    name: 'has_customer_list',
    options: [
      { label: 'Sim', value: 'Sim' },
      { label: 'Não', value: 'Não' },
    ],
  },
  {
    label: 'Possui Rota',
    name: 'has_route',
    options: [
      { label: 'Sim', value: 'Sim' },
      { label: 'Não', value: 'Não' },
    ],
  },
]

export default filters

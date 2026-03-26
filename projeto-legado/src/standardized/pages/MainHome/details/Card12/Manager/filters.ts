import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../../../components/Bullet'
import { peoples as peoplesOptionsLoader } from '../../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Impacto',
    name: 'impact',
    options: [
      {
        label: React.createElement(Bullet, { content: 'Alto', color: '#E23851' }),
        value: 'high',
      },
      {
        label: React.createElement(Bullet, { content: 'Moderado', color: '#F0AD4E' }),
        value: 'moderate',
      },
      {
        label: React.createElement(Bullet, { content: 'Baixo', color: '#62C462' }),
        value: 'low',
      },
    ],
  },
  {
    label: 'Supervisor',
    name: 'supervisor_id',
    options: peoplesOptionsLoader,
  },
  {
    label: 'TMO+',
    name: 'tmo_plus',
    options: [
      { label: '0% a 75%', value: '0_75' },
      { label: '76% a 90%', value: '76_90' },
      { label: '91% a 100%', value: '91_100' },
    ],
  },
  {
    label: 'TMO-',
    name: 'tmo_minus',
    options: [
      { label: 'Abaixo de 10%', value: 'below_10' },
      { label: 'Acima de 10%', value: 'above_10' },
    ],
  },
]

export default filters

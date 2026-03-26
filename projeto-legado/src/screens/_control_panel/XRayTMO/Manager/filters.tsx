import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../components/Bullet'
import { peoples as getSupervisorOptions } from '../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Impacto',
    name: 'impact',
    options: [
      { label: <Bullet content={'Alto'} color={'#EF5350'} />, value: 3 },
      { label: <Bullet content={'Moderado'} color={'#FBCF30'} />, value: 2 },
      { label: <Bullet content={'Baixo'} color={'#66BB6A'} />, value: 1 },
    ],
  },
  {
    label: 'Supervisor',
    name: 'supervisor_id',
    options: getSupervisorOptions,
  },
  {
    label: 'TMO+',
    name: 'tmo_positive',
    options: [
      { label: '0% a 75%', value: 1 },
      { label: '75% a 90%', value: 2 },
      { label: '90% a 100%', value: 3 },
    ],
  },
  {
    label: 'TMO-',
    name: 'tmo_negative',
    options: [
      { label: 'Abaixo de 10%', value: 1 },
      { label: 'Acima de 10%', value: 2 },
    ],
  },
]

export default filters

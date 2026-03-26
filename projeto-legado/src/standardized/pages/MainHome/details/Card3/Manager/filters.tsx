import { FiltersInterfaces } from '@mw-kit/mw-manager'

import React from 'react'

import { peoples as peoplesOptionsLoader } from '../../../../../../services/options'

import Bullet from '../../../../../../components/Bullet'

import { status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: Object.keys(statusLabels).map((key) => {
      const { name, color } = { ...statusLabels[key] }

      const option: FiltersInterfaces.Option = {
        label: React.createElement(Bullet, { content: name, color }),
        value: key,
      }

      return option
    }),
  },
  {
    label: 'Supervisor',
    name: 'supervisor_id',
    options: peoplesOptionsLoader,
  },
  {
    label: 'Atendimento iniciado',
    name: 'attendance_started',
    options: [
      { label: 'Sim', value: 'Sim' },
      { label: 'Não', value: 'Não' },
    ],
  },
  {
    label: 'Classificação',
    name: 'desconected_classification',
    options: [
      { label: '2 horas', value: '2 horas' },
      { label: '4 horas', value: '4 horas' },
      { label: '+1 dia', value: '+1 dia' },
    ],
  },
]

export default filters

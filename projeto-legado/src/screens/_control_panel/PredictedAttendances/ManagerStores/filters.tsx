import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../components/Bullet'
import {
  chains as getChainsOptions,
  flags as getFlagsOptions,
  groups as getGroupsOptions,
  segments as getSegmentsOptions,
} from '../../../../services/options'

import {
  attendanceOrigin as attendanceOriginLabels,
  statusLabels,
} from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'attendance_status',
    options: Object.keys(statusLabels)
      .sort((a: string, b: string): 1 | 0 | -1 => {
        const aName = statusLabels[a].name.toLowerCase()
        const bName = statusLabels[b].name.toLowerCase()

        if (aName < bName) return -1
        else if (aName > bName) return 1
        else return 0
      })
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
    label: 'Origem',
    name: 'attendance_origin',
    options: Object.keys(attendanceOriginLabels)
      .sort((a: string, b: string): 1 | 0 | -1 => {
        const aName = attendanceOriginLabels[a].toLowerCase()
        const bName = attendanceOriginLabels[b].toLowerCase()

        if (aName < bName) return -1
        else if (aName > bName) return 1
        else return 0
      })
      .map((key) => {
        const option: FiltersInterfaces.Option = {
          label: attendanceOriginLabels[key],
          value: key,
        }

        return option
      }),
  },

  {
    label: 'Adicionado',
    name: 'has_added',
    options: [
      {
        label: 'Sim',
        value: 'Sim',
      },
      {
        label: 'Não',
        value: 'Não',
      },
    ],
  },

  {
    label: 'Tipo de Check',
    name: 'check_type',
    options: [
      {
        label: 'Cerca Eletrônica',
        value: 'Cerca Eletrônica',
      },
      {
        label: 'Foto',
        value: 'Foto',
      },
      {
        label: 'Computador',
        value: 'Computador',
      },
      {
        label: 'Tabulação',
        value: 'Tabulação',
      },
      {
        label: 'Check Automático',
        value: 'Check Automatico',
      },
    ],
  },
  {
    label: 'Canal',
    name: 'segment_id',
    options: getSegmentsOptions,
  },
  {
    label: 'Grupo',
    name: 'market_id',
    options: getGroupsOptions,
  },
  {
    label: 'Rede',
    name: 'chain_id',
    options: getChainsOptions,
  },
  {
    label: 'Bandeira',
    name: 'flag_id',
    options: getFlagsOptions,
  },

  /* Esse não está disponivel no momento
  {
    label: "Farol",
    name: "", // ???
    options: [
      {
        label: <Bullet color="#66BB6A" content="OK" />,
        value: 1,
      },
      {
        label: <Bullet color="#FBCF30" content="Ponto de Atenção" />,
        value: 1,
      },
      {
        label: <Bullet color="#E23851" content="Crítico" />,
        value: 1,
      },
    ],
  },
  */
  {
    label: 'Range Quality',
    name: 'range_quality_status',
    options: [
      {
        label: 'Dentro',
        value: 'Dentro',
      },
      {
        label: 'Fora',
        value: 'Fora',
      },
    ],
  },
]

export default filters

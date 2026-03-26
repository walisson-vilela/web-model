import React from 'react'

import { MwIndicator } from '@mw-kit/mw-ui'
import { Filter } from '@mw-kit/mw-ui/types'

import {
  cities,
  peoples,
  regions,
  states,
  teams,
} from '../../../../../services/options'
import { CARD_STATUS } from '../constants'
import { CardStatusOptions } from '../types'

export const status: Filter = {
  label: 'Status',
  name: 'status',
  options: (
    ['CONCLUDED', 'INTERRUPTED', 'ACTIVE'] as (keyof CardStatusOptions)[]
  ).map((key) => {
    const { label, value, indicatorType } = CARD_STATUS[key]
    return {
      label: {
        text: label,
        element: <MwIndicator type={indicatorType} children={label} />,
      },
      value: value,
    }
  }),
}

export const region = (): Filter => ({
  label: 'Área de Atuação',
  name: 'region_id',
  options: async (value, page) => {
    return await regions(value, page, 'mw-ui')
  },
  allowEmptySearch: true,
})

export const state = (): Filter => ({
  label: 'Estado',
  name: 'state_id',
  options: async (value, page) => {
    return await states(value, page, 'mw-ui')
  },
  allowEmptySearch: true,
})

export const city = (): Filter => ({
  label: 'Cidade',
  name: 'city_id',
  options: async (value, page) => {
    return await cities(value, page, 'mw-ui')
  },
  allowEmptySearch: true,
})

export const team = (): Filter => ({
  label: 'Equipe',
  name: 'hierarchy_element_id',
  options: async (value, page) => {
    return await teams(value, page, 'mw-ui')
  },
  allowEmptySearch: true,
})

export const user = (): Filter => ({
  label: 'Usuário',
  name: 'people_id',
  options: async (value, page) => {
    return await peoples(value, page, 'mw-ui')
  },
  allowEmptySearch: true,
})

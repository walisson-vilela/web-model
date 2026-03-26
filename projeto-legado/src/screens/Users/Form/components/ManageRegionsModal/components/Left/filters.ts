import { Filter } from '@mw-kit/mw-ui/types'

import {
  cities,
  groupingAreas,
  mesoregions,
  states,
  sublocalities,
} from '../../../../../../../services/options'

const getFilters = (hierarchy_id: number): Filter[] => [
  {
    name: 'grouping_area_id',
    label: 'Agrupamento de Áreas',
    options: async (value, page) => {
      return await groupingAreas(value, page, hierarchy_id, 'mw-ui')
    },
    allowEmptySearch: true,
  },
  {
    name: 'state_id',
    label: 'Estado',
    options: async (value, page) => {
      return await states(value, page, 'mw-ui')
    },
    allowEmptySearch: true,
  },
  {
    name: 'city_id',
    label: 'Cidade',
    options: async (value, page) => {
      return await cities(value, page, 'mw-ui')
    },
    allowEmptySearch: true,
  },
  {
    name: 'sublocality_id',
    label: 'Bairro',
    options: async (value, page) => {
      return await sublocalities(value, page, 'mw-ui')
    },
    allowEmptySearch: true,
  },
  {
    name: 'mesoregion_id',
    label: 'Mesorregião',
    options: async (value, page) => {
      return await mesoregions(value, page, 'mw-ui')
    },
    allowEmptySearch: true,
  },
]

export default getFilters

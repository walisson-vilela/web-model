import { FiltersProps } from '@mw-kit/mw-ui/dist/components/Filters/Filters/interfaces'

import {
  cities,
  classifications,
  flags,
  states,
  typologies,
} from '../../../../../../../services/options'

const filters: Omit<FiltersProps, 'setAppliedFilters'> = {
  items: [
    {
      label: 'Estado',
      name: 'state_id',
      options: async (value, page) => {
        return await states(value, page, 'mw-ui')
      },
    },
    {
      label: 'Cidade',
      name: 'city_id',
      options: async (value, page) => {
        return await cities(value, page, 'mw-ui')
      },
    },
    {
      label: 'Tipologia',
      name: 'typology_id',
      options: async (value, page) => {
        return await typologies(value, page, 'mw-ui')
      },
    },
    {
      label: 'Bandeira',
      name: 'market_flag_id',
      options: async (value, page) => {
        return await flags(value, page, 'mw-ui')
      },
    },
    {
      label: 'Classificação',
      name: 'classification_id',
      options: async (value, page) => {
        return await classifications(value, page, 'mw-ui')
      },
    },
  ],
}

export default filters

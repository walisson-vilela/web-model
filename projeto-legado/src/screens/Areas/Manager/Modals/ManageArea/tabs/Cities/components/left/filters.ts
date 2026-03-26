import { FiltersProps } from '@mw-kit/mw-ui/dist/components/Filters/Filters/interfaces'

import {
  mesoregions,
  states,
} from '../../../../../../../../../services/options'

const filters: Omit<FiltersProps, 'setAppliedFilters'> = {
  items: [
    {
      label: 'Estado',
      name: 'state_id',
      options: async (value, page) => {
        return await states(value, page, 'mw-ui')
      },
      allowEmptySearch: true,
    },

    {
      label: 'Mesoregião',
      name: 'global_region_id',
      options: async (value, page) => {
        return await mesoregions(value, page, 'mw-ui')
      },
      allowEmptySearch: true,
    },
  ],
}

export default filters

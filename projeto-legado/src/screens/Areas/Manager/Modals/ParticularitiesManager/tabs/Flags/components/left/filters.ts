import { FiltersProps } from '@mw-kit/mw-ui/dist/components/Filters/Filters/interfaces'

import { chains, groups } from '../../../../../../../../../services/options'

const filters: Omit<FiltersProps, 'setAppliedFilters'> = {
  items: [
    {
      label: 'Grupo',
      name: 'group_network_id',
      options: async (value, page) => {
        return await groups(value, page, 'mw-ui')
      },
      allowEmptySearch: true,
    },

    {
      label: 'Rede',
      name: 'network_flag_id',
      options: async (value, page) => {
        return await chains(value, page, 'mw-ui')
      },
      allowEmptySearch: true,
    },
  ],
}

export default filters

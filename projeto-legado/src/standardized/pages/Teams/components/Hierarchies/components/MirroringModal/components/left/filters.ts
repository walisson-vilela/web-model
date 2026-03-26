import { FiltersProps } from '@mw-kit/mw-ui/dist/components/Filters/Filters/interfaces'

import { roles } from '../../../../../../../../../services/options'

const filters: Omit<FiltersProps, 'setAppliedFilters'> = {
  items: [
    {
      label: 'Função',
      name: 'role_id',
      options: async (search, page) => await roles(search, page, 'mw-ui'),
      allowEmptySearch: true,
    },
  ],
}

export default filters

import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import { FiltersProps } from '@mw-kit/mw-ui/dist/components/Filters/Filters/interfaces'

import { regions, roles } from '../../../../../../../../../services/options'

const getFilters: (
  hierarchy_id: number,
) => Omit<FiltersProps, 'setAppliedFilters'> = (hierarchy_id) => ({
  items: [
    {
      label: {
        text: 'Função',
        element: <MwEllipsisContainer children='Função' />,
      },
      name: 'role_id',
      options: async (search, page) =>
        await roles(search, page, 'mw-ui', hierarchy_id),
      allowEmptySearch: true,
    },

    {
      label: {
        text: 'Área de Atuação',
        element: <MwEllipsisContainer children='Área de Atuação' />,
      },
      name: 'region_id',
      options: async (value, page) =>
        await regions(value, page, 'mw-ui', hierarchy_id),
    },
  ],
})

export default getFilters

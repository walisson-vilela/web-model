import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { groups, roles } from '../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: '% Realizado P0',
    name: 'active',
    options: [
      { label: '0 a 60', value: '0 a 60' },
      { label: '60 a 90', value: '60 a 90' },
      { label: '90 a 100', value: '90 a 100' },
    ],
  },
  {
    label: 'Função',
    name: 'role_id',
    options: async (value: string, page?: number) => {
      try {
        return await roles(value, page)
      } catch (_error) {
        return []
      }
    },
  },
  {
    label: 'Equipe',
    name: 'group_id',
    options: async (value: string, page?: number) => {
      try {
        return await groups(value, page)
      } catch (_error) {
        return []
      }
    },
  },
]

export default filters

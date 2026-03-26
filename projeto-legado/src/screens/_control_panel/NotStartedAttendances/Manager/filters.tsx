import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { roles as getRolesOptions } from '../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Função',
    name: 'role_id',
    options: getRolesOptions,
  },
  {
    label: 'Possui Carteira',
    name: 'has_customer_list',
    options: [
      { label: 'Sim', value: 'Sim' },
      { label: 'Não', value: 'Não' },
    ],
  },
  {
    label: 'Possui Rota',
    name: 'has_planned',
    options: [
      { label: 'Sim', value: 'Sim' },
      { label: 'Não', value: 'Não' },
    ],
  },
]

export default filters

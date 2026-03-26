import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { categories } from '../../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Ação',
    name: 'Ação',
    options: [
      { label: 'Ativação', value: 1 },
      { label: 'Inativação', value: 0 },
    ],
  },
  {
    label: 'Motivo',
    name: 'Motivo',
    options: categories,
  },
  {
    label: 'Origem',
    name: 'Origem',
    options: [
      { label: 'Cadastro', value: 1 },
      { label: 'Calendário', value: 0 },
    ],
  },
]

export default filters

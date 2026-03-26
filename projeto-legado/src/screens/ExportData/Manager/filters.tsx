import { FiltersInterfaces } from '@mw-kit/mw-manager'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status Download',
    name: 'status',
    options: [
      { label: 'Concluido', value: 'C' },
      { label: 'Em Processamento', value: 'E' },
      { label: 'Pendente', value: 'P' },
    ],
  },
]

export default filters

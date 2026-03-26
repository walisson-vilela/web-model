import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { stores as getStoresOptions } from '../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Particularidades',
    name: 'particularities',
    options: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
  {
    label: '% Dentro da Meta',
    name: 'between_goal',
    options: [
      { label: '0 à 60', value: 1 },
      { label: '60 à 90', value: 2 },
      { label: '90 à 100', value: 3 },
    ],
  },
  {
    label: 'PDVs',
    name: 'store_id',
    options: getStoresOptions,
  },
]

export default filters

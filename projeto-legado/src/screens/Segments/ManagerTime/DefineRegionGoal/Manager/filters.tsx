import { FiltersInterfaces } from '@mw-kit/mw-manager'

import {
  cities as getCitiesOptions,
  states as getStatesOptions,
} from '../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Estado',
    name: 'state_id',
    options: getStatesOptions,
  },
  {
    label: 'Cidade',
    name: 'city_id',
    options: getCitiesOptions,
  },
]

export default filters

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { segments as getSegmentsOptions } from '../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Canal',
    name: 'name',
    options: getSegmentsOptions,
  },
]

export default filters

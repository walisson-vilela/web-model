import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { menus as getMenusOptions } from '../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Menu',
    name: 'id',
    options: getMenusOptions,
  },
]

export default filters

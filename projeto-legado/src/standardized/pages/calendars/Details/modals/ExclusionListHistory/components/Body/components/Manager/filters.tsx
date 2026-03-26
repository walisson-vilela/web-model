import type { FiltersInterfaces } from '@mw-kit/mw-manager'

import { roles } from '../../../../../../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Função',
    name: 'role_id',
    options: roles,
  },
]

export default filters
